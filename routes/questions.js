const express = require('express');
const router = express.Router();
// const userModel = require('../models/userModel');
const jobModel = require('../models/JobsModel');
// <--- Middleware --->

const {checkLoggedIn, checkAdmin} = require('../middlewares/authUsers');


// <---- add questions ----->

router.get('/jobs/questions/add/:jobId', checkLoggedIn, checkAdmin, async(req, res)=>{
    try {
        const jobData = await jobModel.findById(req.params.jobId);
        res.render('../views/questions/new.ejs', {jobData});
    } catch (error) {
        console.log(error);
    }
})

router.post('/jobs/questions/add/:jobId',checkLoggedIn, checkAdmin,  async(req, res)=>{
    try {
        const questionData = {
            title: req.body.title,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
            option4: req.body.option4,
            ans: req.body.ans,
        };
        const job = await jobModel.findById(req.params.jobId);
        job.questions.push(questionData);
        await job.save();
        req.flash('success', 'new question added successfully');
        res.redirect('back');
    } catch (error) {
        console.log(error);
        req.flash('error', "something went wrong while adding a quesion");
        res.redirect('back');
    }
})

// <---- View questions ----->

router.get('/jobs/questions/view/:jobId',checkLoggedIn, checkAdmin,  async(req, res)=>{
    try {
        const jobData = await jobModel.findById(req.params.jobId);
        const questions = jobData.questions;
        res.render('../views/questions/index.ejs', {questions, jobData});
    } catch (error) {
        console.log(error);
        res.redirect('/jobs');
    }
})

// <---- Edit questions ----->

router.get('/jobs/questions/edit/:jobId/:quesId',checkLoggedIn, checkAdmin,  async(req, res)=>{
    try {
        const jobData = await jobModel.findById(req.params.jobId);
        const question = jobData.questions[req.params.quesId];
        const quesId = req.params.quesId;
        res.render('../views/questions/edit.ejs', {question, jobData, quesId})
    } catch (error) {
        console.log(error);
        res.redirect('/jobs');
    }
})


router.patch('/jobs/questions/edit/:jobId/:quesId',checkLoggedIn, checkAdmin,  async(req, res)=>{
    try {
        const job = await jobModel.findById(req.params.jobId);
        
        const questionData = {
            title: req.body.title,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
            option4: req.body.option4,
            ans: req.body.ans,
        };
        
        job.questions[req.params.quesId] = questionData;
        await job.save();
        req.flash('success', 'question has successfully updated');
        res.redirect(`/jobs/questions/view/${req.params.jobId}`);
        
    } catch (error) {
        req.flash('error', 'something went wrong while updating the question');
        console.log(error);
        res.redirect('/jobs');
    }
})


// <---- Delete questions ----->

router.get('/jobs/questions/delete/:jobId/:quesId',checkLoggedIn, checkAdmin, async(req, res)=>{
    try {
        const job = await jobModel.findById(req.params.jobId);
        const questions = job.questions;
        questions.splice(req.params.quesId, 1);
        await job.save();
        req.flash('success', 'Question deleted');
        res.redirect(`/jobs/questions/view/${req.params.jobId}`);
    } catch (error) {
        req.flash('error', 'something went wrong while deleting the question.');
        console.log(error);
    }
})







module.exports = router;
