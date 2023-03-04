const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.scope("login").findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        const user = await User.create({
          username,
          password: hash,
        });
        const refreshToken = jwt.sign(
          { id: user.id, username: user.username },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "5m" }
        );
        const accessToken = jwt.sign(
          { id: user.id, username: user.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1m" }
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
        });
        res.status(201).json({ accessToken });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else if (result) {
          const refreshToken = jwt.sign(
            { id: user.id, username: user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "5m" }
          );
          const accessToken = jwt.sign(
            { id: user.id, username: user.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1m" }
          );
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
          });
          res.status(200).json({ accessToken });
        } else {
          res.status(400).json({ message: "Invalid credentials" });
        }
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) {
            res.status(401).json({ message: err.message });
          } else {
            const accessToken = jwt.sign(
              { id: user.id, username: user.username },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "1m" }
            );
            res.status(200).json({ accessToken });
          }
        }
      );
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
