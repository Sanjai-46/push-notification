const pussNotificationController = require("../controllers/push-notification.controller");
const express = require("express");
const router = express.Router();


router.get("/SendNotification", pussNotificationController.SendNotification);
router.post("/SendNotificationDevice",pussNotificationController.SendNotificationDevice);

module.exports = router;    


