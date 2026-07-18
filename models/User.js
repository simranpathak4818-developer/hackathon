const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["student", "company", "admin"],
        required: true
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    companyStatus: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },

    profileImage: {
        type: String,
        default: ""
    },

    lastLogin: {
        type: Date
    },

    refreshToken: {
        type: String,
        default: ""
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);