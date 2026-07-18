const CompanyProfile = require("../models/CompanyProfile");

const Job = require("../models/Job");
const Application = require("../models/Application");


// Create Profile
exports.createProfile = async (req, res) => {
    try {

        const profile = await CompanyProfile.create({
            userId: req.user.id,
            ...req.body
        });

        res.status(201).json({
            success: true,
            profile
        });

    } catch (err) {
        res.status(500).json({
            success:false,
            message: err.message
        });
    }
};

// Get Profile
exports.getProfile = async (req, res) => {
    try {

        const profile = await CompanyProfile.findOne({
            userId: req.user.id
        });

        if (!profile)
            return res.status(404).json({
                success:false,
                message: "Profile Not Found"
            });

        res.json(profile);

    } catch (err) {
        res.status(500).json({
            success:false,
            message: err.message
        });
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    try {

        const profile = await CompanyProfile.findOneAndUpdate(
            { userId: req.user.id },
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            profile
        });

    } catch (err) {
        res.status(500).json({
            success:false,
            message: err.message
        });
    }
};


exports.dashboard = async (req, res) => {

    try {

        const jobs = await Job.find({
            company: req.user.id
        });

        const jobIds = jobs.map(job => job._id);

        const totalApplications = await Application.countDocuments({
            job: {
                $in: jobIds
            }
        });

        const selected = await Application.countDocuments({
            job: {
                $in: jobIds
            },
            status: "Selected"
        });

        const rejected = await Application.countDocuments({
            job: {
                $in: jobIds
            },
            status: "Rejected"
        });

        const shortlisted = await Application.countDocuments({
            job: {
                $in: jobIds
            },
            status: "Shortlisted"
        });

        res.json({

            success: true,

            dashboard: {

                jobsPosted: jobs.length,

                totalApplications,

                selected,

                rejected,

                shortlisted

            }

        });

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};