const express = require('express');
const app = express();
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const userModel = require('./models/userModel');


// <--- DB setup ---->
mongoose.connect(process.env.URI).then(() => console.log('DB Connected!'));

// <--- Session setup ---->
app.use(session({
    secret: '92BCD6ED83CCCEFA5689A1F33D622',
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		// secure: true,
		maxAge: 1000 * 60 * 60 * 24 * 2
	}
}))

// <--- Passport setup ---->
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());


// <--- Server setup ---->
// serving static files
app.use(express.static(path.join(__dirname, 'public')));
// form data parsing
app.use(express.urlencoded({ extended: true }));
// remove ejs extension
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use(authRoutes);
app.use(jobRoutes);
app.get('/', (req, res) => {
	res.send('working');
});

app.listen(3000, ()=>{
    console.log("Server is live on port 3000");
})