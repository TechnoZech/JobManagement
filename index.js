const express = require('express');
const app = express();
const jobRoutes = require('./routes/jobRoutes');


app.use(jobRoutes);
app.get('/', (req, res) => {
	res.send('working');
});

app.listen(3000, ()=>{
    console.log("Server is live on port 3000");
})