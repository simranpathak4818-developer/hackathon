const express=require("express");

const router=express.Router();

const verifyJWT=require("../middleware/auth");

const authorize=require("../middleware/roleAuth");

const{

createProfile,

getProfile,

updateProfile,dashboard,profileCompletion 

}=require("../controllers/studentController");

router.post(

"/profile",

verifyJWT,

authorize("student"),

createProfile

);

router.get(

"/profile",

verifyJWT,

authorize("student"),

getProfile

);

router.get(
    "/dashboard",
    verifyJWT,
    authorize("student"),
    dashboard
);

router.get(
    "/profile/completion",
    verifyJWT,
    authorize("student"),
    profileCompletion
);

router.put(

"/profile",

verifyJWT,

authorize("student"),

updateProfile

);

module.exports=router;