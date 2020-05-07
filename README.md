# Natural Language Processor

NLP project allows analyzing texts and articles (also via url) to give insights about entities, contexts, keywords, summary etc. of the given article. External API from Aylien is used.

# Technical details

Project is built using Webpack and based on nodejs+express server.

After checking out project make `npm install` and `npm build-dev`

## Nodejs+Express

Server is responsible for handling requests from the client and calling Aylien API to perform article analysis.

Main entry point for server `/src/server/server.js`. It has additional `aylienApi.js` script that is working as adapter for provided SDK. Server port is either taken from Env variable PORT (useful for deploy on Heroku) or 8080.

For Aylien api environment variables `API_ID` and `API_KEY` has to be provided via environment variables. 
Provided Aylien SDK uses API keys to access analysis endpoints. 
Using callbacks results of analysis are passed as response for post request of the client.

### NPM scripts:
`npm run clean` - removes dist folder and creates empty one
<br>
`npm start` - launches node server
<br>
`npm run test` - runs jest and tests on client side
<br>
`build-dev` - builds project using configuration for development
<br>
`build-dev-server` - builds project and launches webpack server
<br>
`build-prod` - builds project for production, minifies javascripts and css
<br>
`heroku-postbuild` - builds project to be deployed on Heroku

## Client

Client is written on HTML5+CSS3(SASS)+ES6 JS. Using webpack JS is compiled in backward compatible version of JS.

### Tests
Tests are written using JEST and can be found in `src/client/test` folder. Examples of simple Unit tests are provided (including mocking of external calls like `fetch()`).