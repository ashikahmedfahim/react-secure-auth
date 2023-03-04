const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

const { connectToDatabase } = require("./configs/database");
const userRoute = require("./routes/userRoute");

const port = process.env.PORT || 3000;

app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true,
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Server Error" } = err;
  res.status(statusCode).json(message);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

connectToDatabase();
