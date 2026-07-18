const mongoose = require("mongoose");

const companyProfileSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },

    companyName:{
        type:String,
        required:true
    },

    industry:{
        type:String,
        default:""
    },

    website:{
        type:String,
        default:""
    },

    location:{
        type:String,
        default:""
    },

    description:{
        type:String,
        default:""
    },

    companySize:{
        type:String,
        default:""
    },

    logo:{
        type:String,
        default:""
    }

},{
    timestamps:true
});

module.exports=mongoose.model("CompanyProfile",companyProfileSchema);