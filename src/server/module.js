const AYLIENTextAPI = require('aylien_textapi');
let textapi = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});


exports.sentimentAnalysis = function (text, callback) {
    textapi.sentiment({
        'text': text
    }, function (error, response) {
        let res = {};
        if (error === null) {
            res = {
                polarity: response.polarity,
                subjectivity: response.subjectivity
            };
        } else {
            res = {
                error: error.toString()
            }
        }

        callback(res);
    });
}