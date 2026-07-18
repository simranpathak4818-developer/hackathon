

const StudentProfile = require("../models/StudentProfile");
const Application = require("../models/Application");
const Job = require("../models/Job");
const Notification = require("../models/Notification");

exports.createProfile=async(req,res)=>{

try{

const profile=await StudentProfile.create({

userId:req.user.id,

...req.body

});

res.status(201).json({

success:true,

profile

});

}catch(err){

res.status(500).json({

message:err.message

});

}

};

exports.getProfile=async(req,res)=>{

try{

const profile=await StudentProfile.findOne({

userId:req.user.id

});

if(!profile)

return res.status(404).json({

message:"Profile not found"

});

res.json(profile);

}catch(err){

res.status(500).json({

message:err.message

});

}

};

exports.updateProfile=async(req,res)=>{

try{

const profile=await StudentProfile.findOneAndUpdate(

{

userId:req.user.id

},

req.body,

{

new:true

}

);

res.json({

success:true,

profile

});

}catch(err){

res.status(500).json({

message:err.message

});

}

};



exports.dashboard = async (req, res) => {

    try {

        const profile = await StudentProfile.findOne({
            userId: req.user.id
        });

        const appliedJobs = await Application.countDocuments({
            student: req.user.id
        });

        const notifications = await Notification.countDocuments({
            user: req.user.id,
            isRead: false
        });

        const recentJobs = await Job.find({
            status: "Open"
        })
        .sort({ createdAt: -1 })
        .limit(5);

        res.json({
            success: true,
            dashboard: {
                profile,
                appliedJobs,
                unreadNotifications: notifications,
                recentJobs
            }
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.profileCompletion = async (req, res) => {

    try {

        const profile = await StudentProfile.findOne({
            userId: req.user.id
        });

        if (!profile)
            return res.status(404).json({
                message: "Profile not found"
            });

        let total = 8;
        let score = 0;
        let missing = [];

        if (profile.resume) score++;
        else missing.push("Resume");

        if (profile.skills?.length) score++;
        else missing.push("Skills");

        if (profile.github) score++;
        else missing.push("Github");

        if (profile.linkedin) score++;
        else missing.push("LinkedIn");

        if (profile.cgpa) score++;
        else missing.push("CGPA");

        if (profile.branch) score++;
        else missing.push("Branch");

        if (profile.graduationYear) score++;
        else missing.push("Graduation Year");

        if (profile.collegeName) score++;
        else missing.push("College");

        const percentage = Math.round((score / total) * 100);

        res.json({
            success: true,
            percentage,
            missing
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};