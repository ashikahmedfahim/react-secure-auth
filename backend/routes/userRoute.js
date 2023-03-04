const express = require("express");
const router = express.Router();

const { getAllUsers, createUser, loginUser, logoutUser, getAccessToken } = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/getAccessToken", getAccessToken);

module.exports = router;