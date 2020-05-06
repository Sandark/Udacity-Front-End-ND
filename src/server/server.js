const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();

const textAnalyzer = require("./module.js")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("dist"));

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
})

app.get("/", (req, res) => {
    res.sendFile("dist/index.html")
});

app.post("/analyse_sentiment", (req, res) => {
    const requestPayload = extractPayload(req.body);

    textAnalyzer.sentimentAnalysis(requestPayload, (results) => {
        res.json(results)
    });

});

app.post("/analyse_entities", (req, res) => {
    const requestPayload = extractPayload(req.body);


    textAnalyzer.entitiesAnalysis(requestPayload, (results) => {
        res.json(results)
    });
});

app.post("/analyse_combined", (req, res) => {
    const requestPayload = extractPayload(req.body);

    requestPayload["endpoint"] = ["entities", "classify", "sentiment", "summarize"]

    textAnalyzer.combinedAnalysis(requestPayload, (results) => {
        res.json(results)
    });

});

function extractPayload(body) {
    if (body.text !== undefined) {
        return {
            text: body.text
        }
    } else if (body.url !== undefined) {
        return {
            url: body.url
        }
    }
}