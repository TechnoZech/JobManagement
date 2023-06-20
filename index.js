const express = require('express');
const app = express();
const jobRoutes = require('./routes/jobRoutes');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const methodOverride = require('method-override');


mongoose.connect(process.env.URI).then(() => console.log('DB Connected!'));

// ! server setup
// serving static files
app.use(express.static(path.join(__dirname, 'public')));
// form data parsing
app.use(express.urlencoded({ extended: true }));
// remove ejs extension
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use(jobRoutes);
app.get('/', (req, res) => {
	res.send('working');
});

app.listen(3000, ()=>{
    console.log("Server is live on port 3000");
})