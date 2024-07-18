const express = require("express");
const { Middleware } = require("../../middlewares/middleware");
const { Inventory } = require("../../db/db");
const { responseCode } = require("../../config");
const invRouter = express.Router();

invRouter.use(Middleware);

// Route for getting inventory list
/* ************** "http://localhost:3000/admin/inventory" ***************/
invRouter.get("/", async (req, res) => {
  const inventory = await Inventory.find();

  if (inventory != []) {
    res.status(responseCode.Success).json({
      message: "The list of inventory",
      inventory: inventory,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Please try again ,something wrong with server!");
  }
});

// Route for adding inventory
/* ************** "http://localhost:3000/admin/inventory/add" ***************/

invRouter.post("/add", async (req, res) => {
  const body = req.body;
  const inventory = await Inventory.create({
    itemName: body.itemName,
    itemQty: body.itemQty,
    threshold: body.threshold,
    itemPrice: body.itemPrice,
    isAvailable: body.isAvailable,
    Date: body.Date,
  });

  if (inventory != []) {
    res.status(responseCode.Success).json({
      message: "The list added to inventory",
      inventory: inventory,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Please try again ,something wrong with server!");
  }
});

// Route for updating inventory
/* ************** "http://localhost:3000/admin/inventory/update" ***************/

invRouter.put("/update", async (req, res) => {
  const body = req.body;
  const inventory = await Inventory.findByIdAndUpdate(body.invId, {
    itemName: body.itemName,
    itemQty: body.itemQty,
    threshold: body.threshold,
    itemPrice: body.itemPrice,
    isAvailable: body.isAvailable,
  });

  if (inventory != []) {
    res.status(responseCode.Success).json({
      message: "The list updated to inventory",
      inventory: inventory,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Please try again ,something wrong with server!");
  }
});

module.exports = { invRouter };
