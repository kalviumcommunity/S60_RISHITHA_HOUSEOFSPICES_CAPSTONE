const mongoose = require("mongoose");
const dot = require("dotenv")
dot.config()
async function backEnd() {
    try {
        await mongoose.connect(process.env.connectdb);
        console.log("Connected to mongoose");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = backEnd;
