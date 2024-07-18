const express = require("express");
const { Table } = require("../../db/db");
const { responseCode } = require("../../config");
const { Middleware } = require("../../middlewares/middleware");
const tblRoute = express.Router();

// Route for getting tables is
/* ************** "http://localhost:3000/hall/table" ***************/
tblRoute.use(Middleware);
tblRoute.get("/table", async (req, res) => {
  const tables = await Table.find({});

  if (tables) {
    res.status(responseCode.Success).json({
      message: "The tables are :",
      table: tables.map((table) => {
        return table;
      }),
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server, Please try again after sometime!");
  }
});

// Route for add table is
/* ************** "http://localhost:3000/admin/hall/addtable" ***************/
tblRoute.post("/addtable", async (req, res) => {
  const body = req.body;
  const table = await Table.create({
    tblNo: body.tblNo,
    capacity: body.capacity,
  });
  if (table) {
    res.status(responseCode.Success).json({
      message: "Tables added successfully!",
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server, Please try again after sometime!");
  }
});

// Route for update table is
/* ************** "http://localhost:3000/admin/hall/updatetables" ***************/
tblRoute.put("/updatetables", async (req, res) => {
  const body = req.body;
  const table = await Table.findByIdAndUpdate(body.tblId, {
    tblNo: body.tblNo,
    capacity: body.capacity,
    isAvailable: body.isAvailable,
  });

  if (table) {
    res.status(responseCode.Success).json({
      message: "Tabel updated successfully!",
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again!");
  }
});

module.exports = { tblRoute };
