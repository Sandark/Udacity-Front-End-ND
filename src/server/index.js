let path = require("path");

const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.static("dist"));

const port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})

app.get('/', function (req, res) {
    res.sendFile("dist/index.html");
})
