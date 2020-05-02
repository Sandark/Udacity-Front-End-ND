// Using express to run the server
const express = require("express");

// Loading app using express
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require("cors");

app.use(cors());

// Load client from specified package
app.use(express.static("client"));

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
    console.log(`Hello! Server is running on port ${port}`)
});

let projectData = {};

app.post("/add", (req, res) => {
    projectData = {
        date: getCurrentDate(),
        temp: req.body.temp,
        feelings: req.body.feelings
    }

    res.json(projectData);
});

const getCurrentDate = () => {
    let d = new Date();
    return d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
}

app.get("/record", (req, res) => {
    res.json(projectData);
})