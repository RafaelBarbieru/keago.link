"use strict";
const AWS = require("aws-sdk");
AWS.config.update({ region: 'eu-north-1' });

var response404 = "<html><head><title>Not found</title></head><body><h1>404 Not found</h1></body></html>"
function response500(message) {
    return `<html><head><title>Not found</title></head><body><h1>500 Internal server error</h1><hr/><p>${message}</p></body></html>`
};
var response = {
    statusCode: 200,
    isBase64Encoded: false,
    headers: {
        "Content-Type": "text/html"
    },
    body: ""
};

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
            },
            AttributesToGet: [
                'url'
            ]
        };

        console.log("PARAMS", params);

        // Getting the item from DynamoDB.
        await db.get(params).promise().then(function (data, err) {
            if (err) {
                response.statusCode = 500;
                response.body = response500(err.message);
                console.log("500 Error", err);
            }
            else if (Object.keys(data).length === 0) {
                response.statusCode = 404;
                response.body = response404;
                console.log("404 Error", err);
            } else {
                response.statusCode = 302;
                response.headers = { "Content-Type": "text/html", Location: `${data.Item.url}` };
                console.log("302 Redirect", data);
            }
        });
        return response;
    } catch (ex) {
        response.statusCode = 500;
        response.body = response500(ex.message);
        console.log("500 Error", ex);
        return response;
    }
}
exports.handler = handler;
