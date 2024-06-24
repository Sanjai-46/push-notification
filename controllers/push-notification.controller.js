const { ONE_SIGNAL_CONFIG } = require("../config/app.config.js");

const pushNotificationService = require("../services/push-notifications.services.js");

/**
 * This function sends a push notification to all devices.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Object} The response object with a success message and the results.
 */
exports.SendNotification = (req, res, next) => {
    // Define the message object that will be sent to OneSignal API.
    var message = {
        // The ID of the OneSignal app.
        app_id: ONE_SIGNAL_CONFIG.API_ID,
        // The content of the notification message in English.
        contents: { en: "Tesh Push Notifications" },
        // The segments to include in the notification.
        included_segments: ['All'],
        // Set content_available to true to enable silent notifications.
        content_available: true,
        // The small icon to display in the notification.
        small_icon: "ic_notification_icon",
        // Additional data to be included in the notification.
        data: {
            pushTitle: "CUSTOM NOTIFICATIONS"
        }
    };

    // Send the notification using the pushNotificationService.
    pushNotificationService.SendNotification(message, (error, results) => {
        // If there is an error, call the next middleware function with the error.
        if (error) {
            return next(error);
        }
        // If there is no error, send a success message and the results as a response.
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};

exports.SendNotificationDevice = (req, res, next) => {
    var message = {
        app_id: ONE_SIGNAL_CONFIG.API_ID,
        contents: { en: "Tesh Push Notifications" },
        included_segments: ['include_player_ids'],
        include_player_ids: req.body.devices,
        content_available: true,
        small_icon: "ic_notification_icon",
        data: {
            pushTitle: "CUSTOM NOTIFICATIONS"
        }
    };

    pushNotificationService.SendNotification(message, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        })
    })
};