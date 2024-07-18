const express = require("express");
const { responseCode } = require("../../config");
const { Reservation } = require("../../db/db");
const resRouter = express.Router();
// Route for getting reservation details
/* ************** "http://localhost:3000/admin/reservation" ***************/
resRouter.get("/", async (req, res) => {
  const tables = await Reservation.find({
    isDone: true,
    Status: "done",
  });
  if (tables) {
    res.status(responseCode.Success).json({
      message: "reserved tables",
      table: tables.map((table) => {
        return table;
      }),
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again");
  }
});

// Route for reserv a table is
/* ************** "http://localhost:3000/admin/reservation/add" ***************/
resRouter.post("/add", async (req, res) => {
  const body = req.body;

  const reserved = await Reservation.create({
    resTbl: body.resTbl,
    resPerson: {
      userId: req.userId,
      TotalPersons: body.resPerson.TotalPersons,
    },
  });

  if (reserved) {
    const upTbl = await Table.findByIdAndUpdate(body.resTbl, {
      isBooked: true,
    });
    console.log(upTbl);
    if (upTbl) {
      res.status(responseCode.Success).json({
        message: "Your table reserved",
        reserved: reserved,
      });
    } else {
      res
        .status(responseCode.InternalServerError)
        .send("Something wrong with server , Please try again");
    }
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again");
  }
});

// Route for cancel a table is
/* ************** "http://localhost:3000/admin/reservation/cancel" ***************/
resRouter.put("/cancel", async (req, res) => {
  const body = req.body;

  const upTbl = await Table.findByIdAndUpdate(body.resTbl, {
    isBooked: false,
  });

  if (upTbl) {
    const reserved = await Reservation.findByIdAndUpdate(body.resId, {
      Status: "cancel",
    });
    console.log(reserved);
    if (reserved) {
      res.status(responseCode.Success).json({
        message: "Your table reservation is canceled successfully!",
      });
    } else {
      res
        .status(responseCode.InternalServerError)
        .send("Something wrong with server , Please try again");
    }
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again");
  }
});
module.exports = { resRouter };
