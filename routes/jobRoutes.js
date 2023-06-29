const express = require('express');
const router = express.Router();
const jobModel = require('../models/JobsModel');
const userModel = require('../models/userModel');

// <--- Middleware --->

const {checkLoggedIn, checkAdmin} = require('../middlewares/authUsers');


//CRUD
router.get('/jobs', checkLoggedIn, async(req, res)=>{
    try {
        const allJobs = await jobModel.find();
        res.render('../views/jobs/index.ejs', {allJobs});
    } catch (error) {
        req.flash('error','Something went wrong while fetching all jobs, please try again later')
        console.log(error);
    }
})

router.get('/jobs/view/:jobId/:userId', checkLoggedIn, async(req, res)=>{
    try {
        const jobDetail = await jobModel.findById(req.params.jobId);
        const jobId = await userModel.findById(req.params.userId);

        res.render('../views/jobs/viewJob.ejs', {jobDetail, jobId});
    } catch (error) {
        console.log(erorr);
        req.flash('error', 'wrong job id');
        res.redirect('/jobs');
    }
})

router.get('/jobs/new', checkLoggedIn, checkAdmin,  (req, res)=>{
    res.render('../views/jobs/newJobs.ejs');
})

router.post('/jobs/new', checkLoggedIn, checkAdmin, async(req, res)=>{
    try {
        const newJob = new jobModel({
            postName: req.body.postName,
            companyName: req.body.companyName,
            ctc: req.body.ctc,
            positions: req.body.positions,
            location: req.body.location
        });
        await newJob.save();
        console.log("Job Data saved to DB");
        req.flash('success', 'New Job added successfully');
        res.redirect('/jobs');

    } catch (error) {
        req.flash('error', 'Something went wrong while creating a job, please try again later');
        console.log(error);
        res.redirect('/jobs');
    }
})

router.get('/jobs/edit/:id', checkLoggedIn, checkAdmin, async(req, res)=>{
    try {
        const oldJobData = await jobModel.findById(req.params.id);
        res.render('../views/jobs/editJobs.ejs', {oldJobData});
    } catch (error) {
        req.flash('error', 'wrong job id');
        console.log(error);
        res.redirect('/jobs');
    }
})

router.patch('/jobs/edit/:id', checkLoggedIn, checkAdmin, async(req, res)=>{
    try {
        const changedData = {
            postName: req.body.postName,
            companyName: req.body.companyName,
            ctc: req.body.ctc,
            positions: req.body.positions,
            location: req.body.location
        };
        await jobModel.findByIdAndUpdate(req.params.id, changedData);
        req.flash('success', 'Job edited successfully');
        res.redirect('/jobs');
    } catch (error) {
        req.flash('error', 'something went wrong while updating the job');
        console.log(error);
    }
})

router.get('/jobs/delete/:id', checkLoggedIn, checkAdmin, async(req, res)=>{
    try {
        await jobModel.findByIdAndDelete(req.params.id);
        req.flash('success', 'Job has been deleted successfully');
        res.redirect("/jobs");
    } catch (error) {
        req.flash('error', 'something went wrong while deleting the job');
        console.log(error);
    }
})  

// <--- Apply Jobs ---->

router.get('/jobs/apply/:jobId/:userId', async(req, res)=>{
    try {
        res.render('/views/test');
    } catch (error) {
        console.log(error);
        req.flash('error', 'Something went wrong')
        res.redirect('back');
    }
})

module.exports = router;