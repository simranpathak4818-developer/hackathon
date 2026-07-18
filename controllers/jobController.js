const Job = require("../models/Job");

exports.createJob = async (req,res)=>{

try{

const job = await Job.create({

company:req.user.id,

...req.body

});

res.status(201).json({

success:true,

job

});

}catch(err){

res.status(500).json({

message:err.message

});

}

};

exports.getJobs = async(req,res)=>{

try{

const jobs = await Job.find()

.populate("company","name email")

.sort({

createdAt:-1

});

res.json({

success:true,

count:jobs.length,

jobs

});

}catch(err){

res.status(500).json({

message:err.message

});

}

};

exports.getJob = async(req,res)=>{

try{

const job = await Job.findById(req.params.id)

.populate("company","name email");

if(!job)

return res.status(404).json({

message:"Job not found"

});

res.json(job);

}catch(err){

res.status(500).json({

message:err.message

});

}

};

exports.updateJob=async(req,res)=>{

try{

const job=await Job.findOneAndUpdate(

{

_id:req.params.id,

company:req.user.id

},

req.body,

{

new:true

}

);

res.json({

success:true,

job

});

}catch(err){

res.status(500).json({

message:err.message

});

}

};

exports.deleteJob=async(req,res)=>{

try{

await Job.findOneAndDelete({

_id:req.params.id,

company:req.user.id

});

res.json({

success:true,

message:"Job Deleted"

});

}catch(err){

res.status(500).json({

message:err.message

});

}

};


exports.searchJobs = async (req, res) => {

    try {

        const {

            keyword, location,

            jobType,

            skill,

            salaryMin,

            salaryMax,

            experience,

            page = 1,

            limit = 10

        } = req.query;

        let filter = {

            status: "Open"

        };

        if (keyword)
            filter.title = {

                $regex: keyword,

                $options: "i"

            };

        if (location)
            filter.location = {

                $regex: location,

                $options: "i"

            };

        if (jobType)
            filter.jobType = jobType;

        if (skill)
            filter.skills = {

                $in: [skill]

            };

        if (experience)
            filter.experience = {

                $lte: Number(experience)

            };

        if (salaryMin || salaryMax) {

            filter.salary = {};

            if (salaryMin)
                filter.salary.$gte = Number(salaryMin);

            if (salaryMax)
                filter.salary.$lte = Number(salaryMax);

        }

        const jobs = await Job.find(filter)

            .skip((page - 1) * limit)

            .limit(Number(limit))

            .sort({
                createdAt: -1
            });

        const total = await Job.countDocuments(filter);

        res.json({

            success: true,

            total,

            currentPage: Number(page),

            totalPages: Math.ceil(total / limit),

            jobs

        });

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

// exports.searchJobs=async(req,res)=>{

// try{

// const{

// keyword,

// location,

// jobType,

// skill

// }=req.query;

// let filter={};

// if(keyword){

// filter.title={

// $regex:keyword,

// $options:"i"

// };

// }

// if(location){

// filter.location=location;

// }

// if(jobType){

// filter.jobType=jobType;

// }

// if(skill){

// filter.skills={

// $in:[skill]

// };

// }

// const jobs=await Job.find(filter)

// .populate("company","name");

// res.json({

// success:true,

// jobs

// });

// }catch(err){

// res.status(500).json({

// message:err.message

// });

// }

// };

