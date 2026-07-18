const express=require("express");
const cors=require("cors");
const helmet=require("helmet");
const morgan=require("morgan");
const cookieParser=require("cookie-parser");
const studentRoutes=require("./routes/studentRoutes");
const authRoutes=require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobRoutes=require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app=express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(cookieParser());

app.use("/api/student",studentRoutes);

app.use("/api/company", companyRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/jobs",jobRoutes);

app.use("/api/notifications", notificationRoutes);

app.get("/",(req,res)=>{

    res.json({

        success:true,

        message:"Student Placement Portal API Running 🚀"

    });

});

app.use("/api/auth",authRoutes);

const errorHandler = require("./middleware/errorHandler");

app.use(errorHandler);

module.exports=app;