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
    spice: String,
    image: String,
    rarity: String,
    commonAvailability: String,
    health: String,
});

const Spice = mongoose.model("Spice", spicesSchema);

Spice.insertMany(data)
    .then(() => console.log("Data sent"))
    .catch((err) => console.error("Error sending data:", err));

module.exports = {
    connectdb: backEnd,
    model: Spice
};

