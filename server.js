// Using express to run the server
const express = require("express");
const https = require('https');

// Loading app using express
const app = express();

const bodyParser = require("body-parser");
const dotenv = require("dotenv").config({path: "./.env"});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require("cors");

app.use(cors());

/* Specify client side */
app.use(express.static("client"));

/* Specify port from Environment, if not use 8080 */
const port = process.env.PORT || 8080;

/* External API base */
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?`;
const openWeatherKey = process.env.API_KEY;

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

/* Request weather */
app.get("/weather", (req, res) => {
    const weatherParams = {
        units: req.query.units,
        zip: req.query.zip,
        appid: openWeatherKey
    };

    const weatherReq = https.request(compileUrl(weatherParams), weatherRes => {
        let data = "";
        weatherRes.on('data', (chunk) => {
            data += chunk;
        })

        weatherRes.on("end", () => {
            res.json(JSON.parse(data));
        })
    })

    weatherReq.on("error", (error) => {
        res.json(error);
    })

    weatherReq.end();
})

/* Compile URL according to documentation */
const compileUrl = function (params) {
    let url = new URL(baseUrl);

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url;
}
