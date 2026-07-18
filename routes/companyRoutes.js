const express = require("express");

const router = express.Router();

const verifyJWT = require("../middleware/auth");
const authorize = require("../middleware/roleAuth");

const {
    createProfile,
    getProfile,
    updateProfile,
    dashboard
} = require("../controllers/companyController");

router.post(
    "/profile",
    verifyJWT,
    authorize("company"),
    createProfile
);

router.get(
    "/profile",
    verifyJWT,
    authorize("company"),
    getProfile
);

router.put(
    "/profile",
    verifyJWT,
    authorize("company"),
    updateProfile
);

router.get(
    "/dashboard",
    verifyJWT,
    authorize("company"),
    dashboard
);

module.exports = router;