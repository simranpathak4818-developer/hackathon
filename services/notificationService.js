const Notification = require("../models/Notification");

exports.createNotification = async (
    user,
    title,
    message,
    type = "General"
) => {

    try {

        await Notification.create({

            user,

            title,

            message,

            type

        });

    } catch (err) {

        console.log("Notification Error :", err.message);

    }

};