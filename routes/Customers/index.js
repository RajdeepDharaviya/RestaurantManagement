const express = require("express");
const userRoute = express.Router();
const { ordersRoute } = require("./orders");
const { signinRoute } = require("./signin");
const { signupRoute } = require("./signup");
const { resRouter } = require("./reservation");

userRoute.use("/cart", ordersRoute);
userRoute.use("/signin", signinRoute);
userRoute.use("/signup", signupRoute);
userRoute.use("/table", resRouter);

module.exports = { userRoute };
