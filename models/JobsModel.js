const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    postName: {
        type: String,
        required: [true, "You must enter the name of the post"],
        default: "SDE",
        // enum: ['sde', 'Analyst', 'UI', 'HR', 'Manager']
    },

    companyName: String,
    ctc: Number,
    positions: Number,
    location: String,
    questions: [
        {
            title: String,
            option1: String,
            option2: String,
            option3: String,
            option4: String,
            ans: String,
        }

    ],

});


const jobModel = mongoose.model('job', jobSchema);
module.exports = jobModel;
