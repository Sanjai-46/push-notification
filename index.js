const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const serviceAccount = require("./path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post("/api/sendNotification", (req, res) => {
  const { fcmToken, message } = req.body;

  const payload = {
    notification: {
      title: "New Message",
      body: message,
    },
  };

  admin
    .messaging()
    .sendToDevice(fcmToken, payload)
    .then((response) => {
      res.status(200).send("Notification sent successfully");
    })
    .catch((error) => {
      res.status(500).send("Error sending notification: " + error);
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
