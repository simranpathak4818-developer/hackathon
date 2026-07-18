const express = require("express");

const router = express.Router();

const verifyJWT = require("../middleware/auth");

const authorize = require("../middleware/roleAuth");

const {

applyJob,

myApplications,

withdrawApplication,

viewApplicants,

updateStatus

} = require("../controllers/applicationController");

router.post(

"/apply/:jobId",

verifyJWT,

authorize("student"),

applyJob

);

router.get(

"/my",

verifyJWT,

authorize("student"),

myApplications

);

router.put(

"/withdraw/:jobId",

verifyJWT,

authorize("student"),

withdrawApplication

);

router.get(

"/applicants/:jobId",

verifyJWT,

authorize("company"),

viewApplicants

);

router.put(

"/status/:applicationId",

verifyJWT,

authorize("company"),

updateStatus

);

module.exports = router;