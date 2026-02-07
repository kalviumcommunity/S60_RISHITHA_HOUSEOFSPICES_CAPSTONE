const mongoose = require("mongoose");
const dot = require("dotenv");
const data = require("./spcies");
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
    pin: {
        type: String,
        required:true,
    }
})

const userExperienceSchema = new mongoose.Schema({
    experience: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const SpicesList=mongoose.Schema({
    id : {type : mongoose.Schema.Types.ObjectId, ref : 'Spice'},
    Numberof: {type : Number, min : 1}
});

const SpicesCart=mongoose.Schema({
    userid : {type : mongoose.Schema.Types.ObjectId, ref : 'userdata'},
    spices : [SpicesList]
})

const Spice = mongoose.model("Spice", spicesSchema);
const UserExperience = mongoose.model("UserExperience", userExperienceSchema);
const SpiceCart = mongoose.model("SpicesCart",SpicesCart)
const modelUser = mongoose.model("infro", userdata)
module.exports = {
    connectdb: backEnd,
    model: Spice,
    clientModle: modelUser,
    SpicesCart : SpiceCart,
      userExperienceModel: UserExperience,

};
