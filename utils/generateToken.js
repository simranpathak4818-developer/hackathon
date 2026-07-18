// const jwt = require("jsonwebtoken");

// const generateAccessToken = (user) => {
//     return jwt.sign(
//         {
//             id: user._id,
//             role: user.role
//         },
//         process.env.JWT_SECRET,
//         {
//             expiresIn: "1h"
//         }
//     );
// };

// const generateRefreshToken = (user) => {
//     return jwt.sign(
//         {
//             id: user._id
//         },
//         process.env.JWT_REFRESH_SECRET,
//         {
//             expiresIn: "7d"
//         }
//     );
// };

// module.exports = {
//     generateAccessToken,
//     generateRefreshToken
// };


const jwt=require("jsonwebtoken");

const generateAccessToken=(user)=>{

    return jwt.sign(

        {
            id:user._id,
            role:user.role
        },

        process.env.JWT_SECRET,

        {
            expiresIn:process.env.JWT_ACCESS_EXPIRATION
        }

    );

};

const generateRefreshToken=(user)=>{

    return jwt.sign(

        {
            id:user._id
        },

        process.env.JWT_REFRESH_SECRET,

        {
            expiresIn:process.env.JWT_REFRESH_EXPIRATION
        }

    );

};

module.exports={
    generateAccessToken,
    generateRefreshToken
};