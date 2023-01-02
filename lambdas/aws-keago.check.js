"use strict";
const AWS = require("aws-sdk");
AWS.config.update({ region: 'eu-north-1' });

var response = {
    statusCode: 200,
    headers: {
        "Content-Type": "application/json"
    },
    body: {},
    isBase64Encoded: false,
}

const handler = async (event) => {

    try {

        // Getting useful stuff from the event.
        const { word } = event.pathParameters;

        // Preparing the DynamoDB query.
        let db = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName: 'keago-urls',
            Key: {
                word: word
            }
        };

        console.log("PARAMS", params);

        // Getting the item from DynamoDB.
        await db.get(params).promise().then(function (data, err) {
            if (err) {
                response.statusCode = 500;
                response.body = "{ data: err.message }";
                console.log("500 Error", err);
            }
            else if (Object.keys(data).length === 0) {
                response.statusCode = 200;
                response.body = `{ data: ${word} }`;
                console.log("200 Available");
            } else {
                response.statusCode = 409;
                response.body = "{ data: 'Not available' }";
                console.log("409 Conflict - Not available");
            }
        });
        return response;
    } catch (ex) {
        response.statusCode = 500;
        response.body = { message: ex.message };
        console.log("500 Error", ex);
        return response;
    }
}
exports.handler = handler;
