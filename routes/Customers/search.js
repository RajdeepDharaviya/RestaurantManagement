const express = require("express");
const { MiddlewareCustomer } = require("../../middlewares/middleware");
const { MenuItem } = require("../../db/db");
const { responseCode } = require("../../config");
const searchRoute = express.Router();
searchRoute.use(MiddlewareCustomer);

// Route for getting search result
/* ************** "http://localhost:3000/user/search" ***************/
searchRoute.get("/", async (req, res) => {
  const name = req.query.name;

  const items = await MenuItem.find({
    Name: { $regex: name },
  });

  if (items != null) {
    res.status(responseCode.Success).json({
      message: "The search result",
      items: items,
    });
  } else {
    res.status(responseCode.NotFound).send("No match");
  }
});
module.exports = { searchRoute };
