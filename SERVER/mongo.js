const mongoose = require("mongoose");
const dot = require("dotenv");
const data = require("./spcies");
const { required } = require("joi");
dot.config();
async function backEnd() {
    try {
        await mongoose.connect(process.env.connectdb, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
const spicesSchema = mongoose.Schema({
    spice: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required:true,
    },
    rarity:{
        type: String,
        required:true,
    },
    commonAvailability: {
        type: String,
        required:true,
    },
    health: {
        type: String,
        required:true,
    },
});
const userdata = mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:true,
    }
})
const Spice = mongoose.model("Spice", spicesSchema);
const modelUser = mongoose.model("infro", userdata)
// Spice.insertMany(data)
//     .then(() => console.log("Data sent"))
//     .catch((err) => console.error("Error sending data:", err));

module.exports = {
    connectdb: backEnd,
    model: Spice,
    clientModle: modelUser
};

