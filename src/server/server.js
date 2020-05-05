const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("dist"));

const port = process.env.PORT || 8080;

const apiId = process.env.API_ID;
const apiKey = process.env.API_KEY;

app.listen(port, () => {
    console.log(`Application is running on port ${port}\n
   API KEY is ${apiKey}`);
})

app.get("/", (req, res) => {
    res.sendFile("dist/index.html")
});