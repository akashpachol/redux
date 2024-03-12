const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../model/user");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body, "gjhgjhgjhgjh");
  const { name, email, password } = req.body;
  if (!name || !email || password) {
    res.status(400).json({ error: "invalid User" });
  }
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("user already exist");
  }
  const secure_password = await securePassword(password);

  const user = await User.create({
    name,
    email,
    password: secure_password,
  });
  if (user) {
    res
      .status(201)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passwordMatch = await bcrypt.compare(password, password);

  if (user && passwordMatch) {
    res
      .status(200)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const { name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

module.exports = {
  registerUser,
  loginUser,
  getUsers,
};
