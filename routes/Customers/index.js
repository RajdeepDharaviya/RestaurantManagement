const express = require("express");
const userRoute = express.Router();
const { ordersRoute } = require("./orders");
const { signinRoute } = require("./signin");
const { signupRoute } = require("./signup");
const { resRouter } = require("./reservation");
const { searchRoute } = require("./search");

userRoute.use("/cart", ordersRoute);
userRoute.use("/signin", signinRoute);
userRoute.use("/signup", signupRoute);
userRoute.use("/table", resRouter);
userRoute.use("/search", searchRoute);

module.exports = { userRoute };
