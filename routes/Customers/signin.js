const express = require("express");
const { Customer } = require("../../db/db");
const signinRoute = express.Router();
const { responseCode } = require("../../config");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");
const md5 = require("md5");

// Route for Signin is
/* ************** "http://localhost:3000/admin/signin" ***************/
signinRoute.post("/", async (req, res) => {
  // Getting data from the user
  const body = req.body;

  // Inserting data into the database
  const user = await Customer.findOne({
    email: body.username,
    password: md5(body.password),
  });

  // give response to the user
  if (user != null && user != null) {
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      jwtSecret
    );
    res.status(responseCode.Success).json({
      message: "Sign in successfully!",
      token: "Bearer " + token,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("wrong credentials , try again");
  }
});

module.exports = { signinRoute };
