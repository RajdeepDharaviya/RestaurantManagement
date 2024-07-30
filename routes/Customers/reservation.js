const express = require("express");
const { MiddlewareCustomer } = require("../../middlewares/middleware");
const { Reservation, Table } = require("../../db/db");
const { responseCode } = require("../../config");
const resRouter = express.Router();

resRouter.use(MiddlewareCustomer);

// Route for getting available table is
/* ************** "http://localhost:3000/user/table" ***************/
resRouter.get("/", async (req, res) => {
  const tables = await Reservation.find({
    isAvailable: true,
    isBooked: false,
  });
  if (tables != null) {
    res.status(responseCode.Success).json({
      message: "Available tables",
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
/* ************** "http://localhost:3000/user/table/reservation" ***************/
resRouter.post("/reservation", async (req, res) => {
  const body = req.body;

  const reserved = await Reservation.create({
    resTbl: body.resTbl,
    resPerson: {
      userId: req.userId,
      TotalPersons: body.resPerson.TotalPersons,
    },
  });

  if (reserved != null) {
    const upTbl = await Table.findByIdAndUpdate(body.resTbl, {
      isBooked: true,
    });

    if (upTbl != null) {
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
/* ************** "http://localhost:3000/user/table/cancel" ***************/
resRouter.put("/cancel", async (req, res) => {
  const body = req.body;

  const upTbl = await Table.findByIdAndUpdate(body.resTbl, {
    isBooked: false,
  });

  if (upTbl != null) {
    const reserved = await Reservation.findByIdAndUpdate(body.resId, {
      Status: "cancel",
    });

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
