const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const StudentProfile = require("../models/StudentProfile");
const CompanyProfile = require("../models/CompanyProfile");
const { createNotification } = require("../services/notificationService");

exports.dashboard = async (req, res) => {
    try {

        const students = await User.countDocuments({ role: "student" });

        const companies = await User.countDocuments({ role: "company" });

        const approvedCompanies = await User.countDocuments({

    role:"company",

    companyStatus:"Approved"

});

const pendingCompanies = await User.countDocuments({

    role:"company",

    companyStatus:"Pending"

});

const rejectedCompanies = await User.countDocuments({

    role:"company",

    companyStatus:"Rejected"

});

        const jobs = await Job.countDocuments();

        const applications = await Application.countDocuments();

        res.json({
            success: true,
            dashboard: {
                students,
                companies,
                approvedCompanies,
                pendingCompanies,
                rejectedCompanies,
                jobs,
                applications
            }
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

exports.approveCompany = async (req, res) => {

    try {

        const company = await User.findById(req.params.id);

        if (!company)
            return res.status(404).json({
                success:false,
                message:"Company not found"
            });

        if (company.role !== "company")
            return res.status(400).json({
                success:false,
                message:"User is not a company"
            });

        if (company.companyStatus === "Approved")
            return res.status(400).json({
                success:false,
                message:"Company already approved"
            });

        company.companyStatus = "Approved";

        await company.save();

await createNotification(

    company._id,

    "Company Approved",

    "Congratulations! Your company has been approved. You can now post jobs.",

    "Approval"

);


        res.json({

            success:true,

            message:"Company Approved Successfully",

            company

        });

    } catch (err) {

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

exports.rejectCompany = async (req, res) => {

    try {

        const company = await User.findById(req.params.id);

        if (!company)
            return res.status(404).json({
                success:false,
                message:"Company not found"
            });

        if (company.role !== "company")
            return res.status(400).json({
                success:false,
                message:"User is not a company"
            });

        company.companyStatus = "Rejected";

        await company.save();

        await createNotification(

    company._id,

    "Company Rejected",

    "Your company registration has been rejected. Please contact the administrator.",

    "Rejection"

);

        res.json({

            success:true,

            message:"Company Rejected",

            company

        });

    } catch (err) {

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};



exports.getStudents = async (req, res) => {

    try {

        const students = await StudentProfile.find()

            .populate("userId", "name email");

        res.json({
            success: true,
            count: students.length,
            students
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.getCompanies = async (req, res) => {

    try {

        const companies = await CompanyProfile.find()

            .populate("userId", "name email companyApproved");

        res.json({
            success: true,
            count: companies.length,
            companies
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.getJobs = async (req, res) => {

    try {

        const jobs = await Job.find()

            .populate("company", "name email");

        res.json({
            success: true,
            count: jobs.length,
            jobs
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.getApplications = async (req, res) => {

    try {

        const applications = await Application.find()

            .populate("student", "name email")

            .populate("job", "title");

        res.json({
            success: true,
            count: applications.length,
            applications
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

