const express = require("express");
const ordersRoute = express.Router();
const { Orders } = require("../../db/db");
const { responseCode } = require("../../config");
const { MenuItem } = require("../../db/db");
const { MiddlewareCustomer } = require("../../middlewares/middleware");
const { orderRouter } = require("./order");
const { ObjectId } = require("mongodb");
ordersRoute.use(MiddlewareCustomer);

// For Customer to see his/her all orders
// Route for getting orders
/* ************** "http://localhost:3000/user/cart/orders" ***************/
ordersRoute.get("/orders", async (req, res) => {
  // Finding record from the database for the particular user using find()
  const orders = await Orders.aggregate([
    {
      $match: {
        customer: new ObjectId(req.userId),
      },
    },
    {
      $lookup: {
        from: "menuitems",
        localField: "menuItem",
        foreignField: "_id",
        as: "menuitemDetails",
      },
    },
    {
      $unwind: "$menuitemDetails",
    },
    {
      $project: {
        _id: 1,
        orderQty: 1,
        orderPrice: 1,
        Status: 1,
        "menuitemDetails.Name": 1,
        "menuitemDetails.Description": 1,
        "menuitemDetails.Price": 1,
        "menuitemDetails.Type": 1,
        "menuitemDetails.category": 1,
      },
    },
  ]);
  //sendig response to the user
  if (orders != null) {
    res.status(responseCode.Success).json({
      message: "Orders details",
      orders: orders,
    });
  } else {
    res.status(responseCode.Success).send("You don't have orders yet!");
  }
});

// For getting details about particular order from ordered list
// Route for add orders
/* ************** "http://localhost:3000/user/cart/order/add" ***************/
ordersRoute.post("/order/add", async (req, res) => {
  const body = req.body;

  const menuItem = await MenuItem.findById(body.menuItem);

  const orderPrice = menuItem.Price * body.orderQty;

  // Finding record from the database for the particular user using find()
  const orders = await Orders.create({
    menuItem: body.menuItem,
    customer: req.userId,
    orderQty: body.orderQty,
    orderPrice: orderPrice,
  });

  //sendig response to the user
  if (orders != null) {
    res.status(responseCode.Success).json({
      message: "Orders details",
      orders: orders,
    });
  } else {
    res.status(responseCode.Success).send("You don't have orders yet!");
  }
});

// For getting details about particular order from ordered list
// Route for add orders
/* ************** "http://localhost:3000/user/cart/order ***************/
ordersRoute.use("/order", orderRouter);

module.exports = { ordersRoute };
