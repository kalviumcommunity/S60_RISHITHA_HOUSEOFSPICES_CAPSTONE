const express = require("express");
const app = express();
const route = require("./routes")
const {connectdb,model} = require("./mongo");
const cors = require("cors")
app.use(cors())
function getted(){
    return model.db.readyState === 1
}
app.use("/",route)
app.get("/ping", (req, res) => {
    const ret = getted();
    const cra = ret?"successfully":"not successful";
    response.send(cra)
    // return res.send("connected");
});
app.listen(5000, () => {
    connectdb(); 
    console.log("This is Express.js file.");
});


