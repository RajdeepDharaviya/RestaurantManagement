const express = require("express");
const { Middleware } = require("../../middlewares/middleware");
const { Report, Inventory } = require("../../db/db");
const { responseCode } = require("../../config");
const repRoute = express.Router();

repRoute.use(Middleware);

// Route for getting report list
/* ************** "http://localhost:3000/admin/report" ***************/
repRoute.get("/", async (req, res) => {
  const report = await Report.find();

  if (report != []) {
    res.status(responseCode.Success).json({
      message: "Report card",
      report: report,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Please try again, Something wrong with server");
  }
});

// Route for creating report
/* ************** "http://localhost:3000/admin/report/create" ***************/
repRoute.post("/create", async (req, res) => {
  const body = req.body;
  const fromDate = body.fromDate;
  const toDate = body.toDate;
  const inventoryFrom = await Inventory.find({
    Date: fromDate,
    itemName: body.itemName,
  });

  const inventoryTo = await Inventory.find({
    Date: toDate,
    itemName: body.itemName,
  });

  const usedQty = inventoryFrom.itemQty - inventoryTo.itemQty;
  const totalExpense = usedQty * inventoryFrom.itemPrice;

  const report = await Report.create({
    Name: body.Name,
    report: {
      from: fromDate,
      to: toDate,
      availableQty: inventoryTo.itemQty,
      itemName: body.itemName,
      minimumQty: inventoryTo.threshold,
      usedQty: usedQty,
      totalExpense: totalExpense,
    },
  });

  if (report != []) {
    res.status(responseCode.Success).json({
      message: "Report card",
      report: report,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Please try again, Something wrong with server");
  }
});

module.exports = { repRoute };
