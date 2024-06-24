const mongoose = require("mongoose");

const uri = "mongodb+srv://gamosodl:dlgamoso23@todocluster.nz3bpuv.mongodb.net/todoCluster?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB Atlas");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB Atlas: ", err.message);
    });

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema); 

module.exports = User; 
