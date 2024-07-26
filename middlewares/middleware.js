const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const { responseCode } = require("../config");
const { User, Customer } = require("../db/db");
const { use } = require("express/lib/application");

const MiddlewareCustomer = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const fullToken = authorization.split(" ");
  if (fullToken[0] == "Bearer") {
    const userData = jwt.verify(fullToken[1], jwtSecret);
    const user = await Customer.findOne({
      email: userData.email,
    });

    if (user != null) {
      //assigning userId for future use cases
      req.userId = userData.userId;
      next();
    } else {
      res.status(responseCode.NotFound).send("Wrong credetials!");
    }
  } else {
    res.status(responseCode.NotAuthorized).send("You are not authorized!");
  }
};
const Middleware = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const fullToken = authorization.split(" ");

  if (fullToken[0] == "Bearer") {
    const userData = jwt.verify(fullToken[1], jwtSecret);

    const user = await User.findOne({
      email: userData.username,
    });

    if (user.email == userData.username) {
      //assigning userId for future use cases
      req.userId = userData.userId;
      next();
    } else {
      res.status(responseCode.NotFound).send("Wrong credetials!");
    }
  } else {
    res.status(responseCode.NotAuthorized).send("You are not authorized!");
  }
};

module.exports = { Middleware, MiddlewareCustomer };
