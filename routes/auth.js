const express = require('express');
const router = express.Router();
const passport = require('passport');
const userModel = require('../models/userModel');

router.get('/login', (req, res)=>{
    console.log(req.userModel);
    res.render('../views/users/login.ejs');
})

router.post(
    '/login', 
    passport.authenticate('local', {
        failureRedirect: '/login'
    }),
    (req, res)=>{
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
                res.send(err);
            }else{
                res.redirect('/jobs');
            };
        })
    } catch (error) {
        console.log(error);
    }
})

router.get('/logout', (req, res)=>{
    req.logout((err)=>{
        if(err) res.send(err);
        res.redirect('/login');
    });
})

module.exports = router;