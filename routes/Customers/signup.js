const express = require("express");
const { Customer } = require("../../db/db");
const signupRoute = express.Router();
const { responseCode } = require("../../config");
const md5 = require("md5");
const { customersignupSchema } = require("../../middlewares/validation");

// Route for Signup is
/* ************** "http://localhost:3000/user/signup" ***************/
signupRoute.post("/", async (req, res) => {
  // Getting data from the user
  const body = req.body;

  if (customersignupSchema.safeParse(body).success) {
    // Inserting data into the database
    const user = await Customer.create({
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      password: md5(body.password),
      contact: body.contact,
      address: body.address,
    });

    // give response to the user
    if (user != null) {
      res.status(responseCode.Success).json({
        message: "Your account has created successfully!",
      });
    } else {
      res
        .status(responseCode.InternalServerError)
        .send("Something wrong with server, please try again after sometime!");
    }
  } else {
    res.status(responseCode.NotValid).send("Please provide valid credetials!");
  }
});

module.exports = { signupRoute };
