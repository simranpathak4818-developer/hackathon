const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find({

            user: req.user.id

        }).sort({

            createdAt: -1

        });

        res.json({

            success: true,

            count: notifications.length,

            notifications

        });

    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

exports.markAsRead = async (req, res) => {

    try {

        const notification = await Notification.findOneAndUpdate(

            {

                _id: req.params.id,

                user: req.user.id

            },

            {

                isRead: true

            },

            {

                new: true

            }

        );

        if (!notification)
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });

        res.json({

            success: true,

            notification

        });

    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

exports.deleteNotification = async (req, res) => {

    try {

        await Notification.findOneAndDelete({

            _id: req.params.id,

            user: req.user.id

        });

        res.json({

            success: true,

            message: "Notification Deleted"

        });

    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};