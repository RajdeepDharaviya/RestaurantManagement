const express = require("express");
const { User } = require("../../db/db");
const signupRoute = express.Router();
const { responseCode } = require("../../config");
const md5 = require("md5");
const { usersignupSchema } = require("../../middlewares/validation");

// Route for Signup is
/* ************** "http://localhost:3000/admin/signup" ***************/
signupRoute.post("/", async (req, res) => {
  // Getting data from the user
  const body = req.body;
  console.log(req.body);
  if (usersignupSchema.safeParse(body).success) {
    // Inserting data into the database
    const user = await User.create({
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      password: md5(body.password),
      contact: body.contact,
      role: body.role,
    });

    // give response to the user
    if (user) {
      res.status(responseCode.Success).json({
        message: "Your account has created successfully!",
      });
    } else {
      res
        .status(responseCode.InternalServerError)
        .send("Something wrong with server, please try again after sometime!");
    }
  } else {
    res.status(responseCode.NotValid).send("Please provid valid credetials!");
  }
});

module.exports = { signupRoute };
