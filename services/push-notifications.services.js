const { json } = require("express");
const {ONE_SIGNAL_CONFIG} = require("../config/app.config");
const { stringify } = require("querystring");

/**
 * Sends a notification using OneSignal API.
 *
 * @param {Object} data - The notification data.
 * @param {function} callback - The callback function that receives the response data.
 *
 * @returns {Promise} - A Promise that resolves with the response data or rejects with an error.
 */
async function SendNotification(data, callback) {
    // Define the headers to be sent with the request
    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        Authorization:"Basic "+ ONE_SIGNAL_CONFIG.API_KEY,
    };

    // Define the options for the request
    var options = {
        host:"onesignal.com",
        port:443,
        path:"/api/v1/notifications",
        method:"POST",
        headers:headers
    };

    // Create a new request using the https module
    var https = require("https");
    var req = https.request(options, function(res){
        // Handle the response data
        res.on("data",function(data){
            console.log(JSON.parse(data));
            // Call the callback function with the response data
            return callback(null,JSON.parse(data));
        });
        
    });

    // Handle any errors that occur during the request
    req.on("error",function(e){
        // Call the callback function with the error message
        return callback({
            message:e
        });
    });

    // Write the request body
    req.write(JSON.stringify(data));
    // End the request
    req.end();
}

module.exports ={
    SendNotification
}