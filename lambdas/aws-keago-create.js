"use strict";
const AWS = require("aws-sdk");
AWS.config.update({ region: 'eu-north-1' });

var response = {
    statusCode: 201,
    headers: {
        "Content-Type": "application/json"
    },
    body: "",
    isBase64Encoded: false,
}

function response400(message) {
    return {
        statusCode: 400,
        headers: {
            "Content-Type": "application/json"
        },
        body: `data: {${message}}`,
        isBase64Encoded: false
    };
}

const handler = async (event) => {

    try {

        // Getting useful stuff from the event.
        const { word } = event.pathParameters;
        const { url, exp } = JSON.parse(event.body);

        console.log("BODY", event.body);

        console.log("EVENT", {
            word: event.pathParameters.word,
            url: event.body.url,
            exp: event.body.exp
        });

        if (!word || word.length === 0) return response400("The word is invalid");
        if (!url || url.length === 0) return response400("The url is invalid");

        // Preparing the DynamoDB query.
        const ttl = Date.now() / 1000 + parseInt(exp);
        let db = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName: 'keago-urls',
            Item: {
                word: word,
                url: url,
                ttl: ttl
            }
        };

        console.log("PARAMS", params);

        // Getting the item from DynamoDB.
        await db.put(params).promise().then(function (data, err) {
            if (err) {
                response.statusCode = 500;
                response.body = `{ data: ${err.message} }`;
                console.log("500 Internal server error");
            } else {
                response.statusCode = 201;
                response.body = `https://keago.link/${word}`;
                console.log("201 Created");
            }
            
        });
        return response;
    } catch (ex) {
        response.statusCode = 500;
        response.body = `{ message: ${ex.message} }`;
        console.log("500 Error", ex);
        return response;
    }
}
exports.handler = handler;
