const mongoose = require("mongoose");

// Connect to MongoDB
const dbConnection = async () => {
  try {
    console.log("fkjgkfjgkfa  ");
    await mongoose.connect('mongodb://127.0.0.1:27017/userManagment')
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = dbConnection;
