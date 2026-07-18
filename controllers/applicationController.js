const Application = require("../models/Application");
const Job = require("../models/Job");
const { createNotification } = require("../services/notificationService");

// ---------------------
// APPLY FOR JOB
// ---------------------
exports.applyJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);

        if (!job)
            return res.status(404).json({
                message: "Job not found"
            });

        if (job.status === "Closed")
            return res.status(400).json({
                message: "Job Closed"
            });

        if (job.deadline < new Date())
            return res.status(400).json({
                message: "Deadline Over"
            });

        const exists = await Application.findOne({
            student: req.user.id,
            job: req.params.jobId
        });

        if (exists)
            return res.status(400).json({
                message: "Already Applied"
            });

        const application = await Application.create({
            student: req.user.id,
            job: req.params.jobId
        });

        // FIX: Fire notification BEFORE sending response
        await createNotification(
            req.user.id,
            "Application Submitted",
            "You successfully applied for this job.",
            "Application"
        );

        return res.status(201).json({
            success: true,
            application
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// ---------------------
// MY APPLICATIONS LIST
// ---------------------
exports.myApplications = async (req, res) => {
    try {
        const apps = await Application.find({
            student: req.user.id
        })
        .populate("job")
        .sort({ createdAt: -1 });

        return res.json({
            success: true,
            applications: apps
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// ---------------------
// WITHDRAW APPLICATION
// ---------------------
exports.withdrawApplication = async (req, res) => {
    try {
        const app = await Application.findOneAndUpdate(
            {
                student: req.user.id,
                job: req.params.jobId
            },
            { status: "Withdrawn" },
            { new: true }
        );

        if (!app) {
            return res.status(404).json({ message: "Application not found" });
        }

        return res.json({
            success: true,
            app
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// ---------------------
// VIEW APPLICANTS (COMPANY SIDE)
// ---------------------
exports.viewApplicants = async (req, res) => {
    try {
        const job = await Job.findOne({
            _id: req.params.jobId,
            company: req.user.id
        });

        if (!job)
            return res.status(404).json({
                message: "Job not found"
            });

        const applicants = await Application.find({
            job: req.params.jobId
        })
        .populate("student", "name email")
        .sort({ createdAt: -1 });

        return res.json({
            success: true,
            applicants
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// ---------------------
// UPDATE STATUS (COMPANY SIDE)
// ---------------------
exports.updateStatus = async (req, res) => {
    try {
        // OPTIMIZATION & FIX: Update and populate the student path in a single execution block
        const updatedApp = await Application.findByIdAndUpdate(
            req.params.applicationId,
            { status: req.body.status },
            { new: true }
        ).populate("student");

        if (!updatedApp) {
            return res.status(404).json({ message: "Application target missing" });
        }

        // Fire notification BEFORE sending response
        await createNotification(
            updatedApp.student._id,
            `Application ${updatedApp.status}`,
            `Your application status has been updated to ${updatedApp.status}.`,
            updatedApp.status === "Selected"
                ? "Selection"
                : updatedApp.status === "Rejected"
                ? "Rejection"
                : "Application"
        );

        return res.json({
            success: true,
            app: updatedApp
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
