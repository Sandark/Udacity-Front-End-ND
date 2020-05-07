const express = require("express");
const compression = require("compression");
const app = express();
app.use(compression());

const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();

const aylienApi = require("./aylienApi.js")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("dist"));

/* Setting up port, either provided from environment or static 8080 */
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
})

/* index.html page */
app.get("/", (req, res) => {
    res.sendFile("dist/index.html")
});

/* post requests */
app.post("/analyse_sentiment", (req, res) => {
    const requestPayload = extractPayload(req.body);

    aylienApi.sentimentAnalysis(requestPayload, (results) => {
        res.json(results)
    });

});

app.post("/analyse_entities", (req, res) => {
    const requestPayload = extractPayload(req.body);


    aylienApi.entitiesAnalysis(requestPayload, (results) => {
        res.json(results)
    });
});

app.post("/analyse_combined", (req, res) => {
    const requestPayload = extractPayload(req.body);

    requestPayload["endpoint"] = ["entities", "classify", "sentiment", "summarize"]

    aylienApi.combinedAnalysis(requestPayload, (results) => {
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