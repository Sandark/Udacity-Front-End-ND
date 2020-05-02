# Weather journal

A small web page to get familiar with Node.js, express, and async JS.

## Functionality
* By selecting ZipCode (only US) we can retrieve current temperature that will be used for storing our record on the server
* ZipCode and Feelings fields are validated to have at least some characters inside, otherwise, they will be colored by a red border
* Once a user clicks "Generate" button - the client makes a request to Openweather API to get current temperature and if it's successful - posts diary record on the server
* On page loading GET request is made to retrieve recent data if exist
* Node server stores the latest record of the journal

## Additionally
* Special .gitgnore is created using npx (npx gitignore node)
* Deployed on heroku: https://sandark-weather-journal.herokuapp.com/