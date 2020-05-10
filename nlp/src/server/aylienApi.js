const AYLIENTextAPI = require('aylien_textapi');
let textapi = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

exports.combinedAnalysis = function (requestPayload, callback) {
    textapi.combined(requestPayload, function (err, result) {
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
                            res[`category${key}`] = categories[key].label;
                        })
                } else if (r.endpoint === "summarize") {
                    if (r.result.sentences.length > 0) {
                        res["summary"] = r.result.sentences.join("\n");
                    }
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
exports.sentimentAnalysis = function (requestPayload, callback) {
    textapi.sentiment(requestPayload, function (error, response) {
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

exports.entitiesAnalysis = function (requestPayload, callback) {
    textapi.entities(requestPayload, function (error, response) {
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
