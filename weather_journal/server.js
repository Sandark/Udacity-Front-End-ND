// Using express to run the server
const express = require("express");

// Loading app using express
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require("cors");

app.use(cors());

/* Specify client side */
app.use(express.static("client"));

/* Specify port from Environment, if not use 8080 */
const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
    console.log(`Hello! Server is running on port ${port}`)
});

let projectData = {};

/* Process new record */
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

/* Get recent record */
app.get("/record", (req, res) => {
    res.json(projectData);
})