const express = require('express');
const router = express.Router();
const passport = require('passport');
const userModel = require('../models/userModel');

router.get('/login', (req, res)=>{ 
    res.render('../views/users/login.ejs');
})

router.post(
    '/login', 
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true,
    }),
    (req, res)=>{
        req.flash('success', 'Welcome back user');
        res.redirect('/jobs');
    }
)


router.get('/signup', (req, res)=>{
    res.render('../views/users/signup.ejs');
})

router.post('/signup', async(req, res)=>{
    try {
        const newUserData = new userModel({
            name: req.body.name,
            username: req.body.username,
        });
        let registeredUser = await userModel.register(newUserData, req.body.password);
        req.login(registeredUser, (err)=>{
            if(err){
                req.flash('error', 'Something went wrong while SignUp');
            }else{
                req.flash('success', 'you have successfully registered');
                res.redirect('/jobs');
            };
        })
    } catch (error) {
        req.flash('error', 'Something went wrong while SignUp');
        console.log(error);
        res.redirect('/signup');
    }
})

router.get('/logout', (req, res)=>{
    req.logout((err)=>{
        if(err){
            req.flash('error', 'Something went wrong while logging you out, please try again later')
        }else{
            req.flash('success', 'You Successfully Logged out')
            res.redirect('/login');
        }
        
    });
})

module.exports = router;