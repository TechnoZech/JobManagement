const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: String
})

userSchema.plugin(passportLocalMongoose);
const userModel = mongoose.model('users', userSchema);
module.exports = userModel;