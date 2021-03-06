// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 3000;
// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));



// Setup Server
app.listen(port, listening);

function listening(){
console.log(`server is running on localhost: ${port}`);
}


app.get('/getWeather', (req, res) => {
    res.send(projectData);
})

app.post('/addWeather', (req, res) => {
    console.log(req.body);
    projectData = {temp: req.body.temp, date:req.body.date , content: req.body.content};

    console.log(projectData);
    res.send();
})

//projectData.temp = req.body.temp;
//projectData.date = req.body.date;
//projectData.content = req.body.content;
