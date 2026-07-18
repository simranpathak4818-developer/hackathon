const express = require("express");

const router = express.Router();

const verifyJWT = require("../middleware/auth");
const authorize = require("../middleware/roleAuth");

const {

dashboard,

approveCompany,

rejectCompany,

getStudents,

getCompanies,

getJobs,

getApplications

} = require("../controllers/adminController");

router.use(verifyJWT);

router.use(authorize("admin"));

router.get("/dashboard", dashboard);

router.put("/approve/:id", approveCompany);

router.delete("/reject/:id", rejectCompany);

router.get("/students", getStudents);

router.get("/companies", getCompanies);

router.get("/jobs", getJobs);

router.get("/applications", getApplications);

module.exports = router;