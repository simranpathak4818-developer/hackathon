// const mongoose = require("mongoose");

// const connectDB = async () => {
//     try {

//         console.log("🔄 Connecting to MongoDB Atlas...");

//         const conn = await mongoose.connect(process.env.MONGO_URI);

//         console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

//     } catch (error) {

//         console.error("❌ Database Connection Failed");
//         console.error(error.message);

//         process.exit(1);
//     }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
    // 1. Safety Check: Verify the URI exists before trying to connect
    if (!process.env.MONGO_URI) {
        console.error("❌ CRITICAL ERROR: MONGO_URI is missing from your .env file!");
        process.exit(1);
    }

    try {
        console.log("🔄 Connecting to MongoDB Atlas...");
        
        // 2. Attempt the database connection
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // 3. Handle errors and exit safely if connection fails
        console.error("❌ Database Connection Failed");
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
