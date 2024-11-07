const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.connect("mongodb://127.0.0.1:27017/authtestapp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: Number
});



module.exports = mongoose.model("User", userSchema);
