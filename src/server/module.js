const AYLIENTextAPI = require('aylien_textapi');
let textapi = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

exports.combinedAnalysis = function(text, callback) {
    textapi.combined({
        text: text,
        endpoint: ["entities", "classify", "sentiment"]
    }, function(err, result) {
        let res = {};
        if (err === null) {
            result.results.forEach(r => {

                if (r.endpoint === "entities") {
                    const entities = r.result.entities;
                    Object.keys(entities)
                        .forEach(key => {
                            res[key] = entities[key].join(", ");
                        })
                } else if (r.endpoint === "classify") {
                    const categories = r.result.categories;

                    Object.keys(categories)
                        .forEach(key => {
                            res[key] = categories[key].join(", ");
                        })
                } else {
                    res["polarity"] = r.result.polarity;
                    res["subjectivity"] = r.result.subjectivity;
                }
            });
        } else {
            res = {
                error: error.toString()
            }
        }

        callback(res);
    });

}
exports.sentimentAnalysis = function (text, callback) {
    textapi.sentiment({
        text: text
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

exports.entitiesAnalysis = function (text, callback) {
    textapi.entities({
        text: text
    }, function (error, response) {
        let res = {};
        if (error === null) {
            const entities = response.entities;

            Object.keys(entities)
                .forEach(key => {
                    res[key] = entities[key].join(", ");
                })

        } else {
            res = {
                error: error.toString()
            }
        }

        callback(res);
    });

}
