const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    postName: {
        type: String,
        required: [true, "You must enter the name of the post"],
        default: "SDE",
        enum: ['sde', 'Analyst', 'UI', 'HR', 'Manager']
    },

    companyName: String,
    ctc: Number,
    positions: Number,
    location: String

});


const jobModel = mongoose.model('job', jobSchema);
module.exports = jobModel;
