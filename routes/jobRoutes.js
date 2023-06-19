const express = require('express');
const router = express.Router();


//CRUD
router.get('/jobs', (req, res)=>{
    res.send('Job server is working');
})

router.get('/jobs/new', (req, res)=>{
    res.render('../views/jobs/newJobs.ejs');
})

module.exports = router;