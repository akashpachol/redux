const express = require("express");
const userRoute = express();
const multer=require('../middleware/multer')
const {
  registerUser,
  loginUser,
  editUser,

} = require("../Controller/userController");

userRoute.post("/", loginUser);
userRoute.post("/register", registerUser);

userRoute.put('/:userId',editUser)


module.exports = userRoute;
