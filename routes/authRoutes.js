const express = require("express");

const router = express.Router();

const {
  registerStudent,
  registerCompany,
  login,
  refreshToken,
  logout,
} = require("../controllers/authController");

router.post("/student/register", registerStudent);

router.post("/company/register", registerCompany);

router.post("/login", login);

router.post("/refresh-token", refreshToken);

router.post("/logout", logout);

module.exports = router;