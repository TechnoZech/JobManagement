const express = require('express');
const userModel = require('../models/userModel');
const router = express.Router();


// <--- Middleware --->
const {checkLoggedIn, verifyUser} = require('../middlewares/authUsers');

// CRUD

