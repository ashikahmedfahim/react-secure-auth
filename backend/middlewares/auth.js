module.exports.isLoggedIn = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    if (accessToken) {
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          res.status(401).json({ message: err.message });
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};