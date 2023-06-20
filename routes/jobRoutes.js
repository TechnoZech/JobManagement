const express = require('express');
const router = express.Router();
const jobModel = require('../models/JobsModel');


//CRUD
router.get('/jobs', async(req, res)=>{
    try {
        console.log(req.userModel);
        const allJobs = await jobModel.find();
        res.render('../views/jobs/index.ejs', {allJobs});
    } catch (error) {
        console.log(error);
    }
})

router.get('/jobs/new', (req, res)=>{
    res.render('../views/jobs/newJobs.ejs');
})

router.post('/jobs/new', async(req, res)=>{
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
        res.redirect('/jobs');

    } catch (error) {
        console.log(error);
    }
})

router.get('/jobs/edit/:id', async(req, res)=>{
    try {
        const oldJobData = await jobModel.findById(req.params.id);
        res.render('../views/jobs/editJobs.ejs', {oldJobData});
    } catch (error) {
        console.log(error);
    }
})

router.patch('/jobs/edit/:id', async(req, res)=>{
    try {
        const changedData = {
            postName: req.body.postName,
            companyName: req.body.companyName,
            ctc: req.body.ctc,
            positions: req.body.positions,
            location: req.body.location
        };
        await jobModel.findByIdAndUpdate(req.params.id, changedData);
        res.redirect('/jobs');
    } catch (error) {
        console.log(error);
    }
})

router.get('/jobs/delete/:id', async(req, res)=>{
    try {
        await jobModel.findByIdAndDelete(req.params.id);
        res.redirect("/jobs");
    } catch (error) {
        console.log(error);
    }
})




module.exports = router;