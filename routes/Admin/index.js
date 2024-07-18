const express = require("express");
const adminRoute = express.Router();
const { orderRoute } = require("./orders");
const { signupRoute } = require("./signup");
const { signinRoute } = require("./signin");
const { tblRoute } = require("./tables");
const { mniRouter } = require("./menuitems");
const { resRouter } = require("./reservation");
const { invRouter } = require("./inventory");
const { repRoute } = require("./report");

// Routes for different endpoints
adminRoute.use("/signup", signupRoute);
adminRoute.use("/signin", signinRoute);
adminRoute.use("/orders", orderRoute);
adminRoute.use("/reservation", resRouter);
adminRoute.use("/hall", tblRoute);
adminRoute.use("/menuitems", mniRouter);
adminRoute.use("/inventory", invRouter);
adminRoute.use("/report", repRoute);

module.exports = { adminRoute };
