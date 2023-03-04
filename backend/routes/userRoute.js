const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createUser,
  loginUser,
  logoutUser,
  getAccessToken,
} = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/auth");

router.get("/", isLoggedIn, getAllUsers);
router.post("/", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getAccessToken", getAccessToken);

module.exports = router;
