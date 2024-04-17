const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  getUsers,
  searchUser,
  userBlock,
  registerUser,
  loadDashboard,
  editUser,
} = require("../Controller/adminController");
const { protectAdmin } = require("../middleware/auth");

router.post("/", loginAdmin);
router.get("/", loadDashboard);

router.get("/dashboard", protectAdmin, getUsers);

router.post("/search", protectAdmin, searchUser);
router.post("/block", protectAdmin, userBlock);
router.put("/:userId", protectAdmin, editUser);
router.post("/adduser", protectAdmin, registerUser);
module.exports = router;
