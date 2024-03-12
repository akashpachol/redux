const mongoose = require("mongoose");

// Connect to MongoDB
const dbConnection = async () => {
  try {
   
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = dbConnection;
