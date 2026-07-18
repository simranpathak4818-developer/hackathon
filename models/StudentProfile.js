const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },

    college:{
        type:String,
        default:""
    },

    degree:{
        type:String,
        default:""
    },

    branch:{
        type:String,
        default:""
    },

    graduationYear:{
        type:Number
    },

    cgpa:{
        type:Number
    },

    skills:[String],

    resume:{
        type:String,
        default:""
    },

    github:{
        type:String,
        default:""
    },

    linkedin:{
        type:String,
        default:""
    },

    bio:{
        type:String,
        default:""
    }

},{
    timestamps:true
});

module.exports=mongoose.model("StudentProfile",studentProfileSchema);