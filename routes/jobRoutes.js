const express=require("express");

const checkCompanyApproval = require("../middleware/checkCompanyApproval");

const router=express.Router();

const verifyJWT=require("../middleware/auth");

const authorize=require("../middleware/roleAuth");



const{

createJob,

getJobs,

getJob,

updateJob,

deleteJob,

searchJobs

}=require("../controllers/jobController");

router.post(
"/",
verifyJWT,
authorize("company"),
checkCompanyApproval,
createJob
);

router.get(

"/",

getJobs

);

router.get(

"/search",

searchJobs

);

router.get(

"/:id",

getJob

);

router.put(

"/:id",

verifyJWT,

authorize("company"),

checkCompanyApproval,

updateJob

);

router.delete(

"/:id",

verifyJWT,

authorize("company"),
checkCompanyApproval,

deleteJob

);

module.exports=router;