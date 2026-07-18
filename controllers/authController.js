const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");

const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

// ---------------------
// STUDENT REGISTER
// ---------------------
exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    if (!validator.isEmail(email))
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });

    const domain = email.split("@")[1];

    if (
      !domain.endsWith(".edu") &&
      !domain.endsWith(".ac.in")
    ) {
      return res.status(400).json({
        success: false,
        message: "Use college email",
      });
    }

    const exists = await User.findOne({ email });

    if (exists)
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      role: "student",
      isVerified: false,
    });

    res.status(201).json({
      success: true,
      message: "Student Registered Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ---------------------
// COMPANY REGISTER
// ---------------------
exports.registerCompany = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists)
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hash,
      role: "company",
      companyStatus: "Pending",
      isVerified: true,
    });

    res.status(201).json({
      success: true,
      message: "Company Registered",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ---------------------
// LOGIN (Updated with lastLogin)
// ---------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Calculate expiry date (7 days from now)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    await RefreshToken.findOneAndUpdate(
      { userId: user._id },
      {
        token: refreshToken,
        expiresAt: expiryDate,
      },
      { upsert: true }
    );

    // Track the date and time of this successful login
    user.lastLogin = new Date();
    await user.save();

    res.json({
      success: true,
      accessToken,
      refreshToken,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ---------------------
// REFRESH TOKEN
// ---------------------
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return res.status(401).json({
        message: "Refresh token required",
      });

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const tokenDoc =
      await RefreshToken.findOne({
        userId: decoded.id,
        token: refreshToken,
      });

    if (!tokenDoc)
      return res.status(401).json({
        message: "Invalid refresh token",
      });

    const user = await User.findById(decoded.id);

    const accessToken = generateAccessToken(user);

    res.json({
      success: true,
      accessToken,
    });
  } catch (err) {
    res.status(401).json({
      message: "Refresh token expired",
    });
  }
};

// ---------------------
// LOGOUT
// ---------------------
exports.logout = async (req, res) => {
  try {
    const { userId } = req.body;

    await RefreshToken.deleteOne({
      userId,
    });

    res.json({
      success: true,
      message: "Logged Out",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
