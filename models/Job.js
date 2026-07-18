const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({

    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    skills:[
        {
            type:String
        }
    ],

    location:{
        type:String,
        required:true
    },

    jobType:{
        type:String,
        enum:["Internship","Full-Time","Part-Time"],
        required:true
    },

    salary:{
        type:Number,
        required:true
    },

    experience:{
        type:Number,
        default:0
    },

    deadline:{
        type:Date,
        required:true
    },

    vacancies:{
        type:Number,
        default:1
    },

    status:{
        type:String,
        enum:["Open","Closed"],
        default:"Open"
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Job", jobSchema);