const express = require("express");
const { MiddlewareCustomer } = require("../../middlewares/middleware");
const { Orders, MenuItem } = require("../../db/db");
const { responseCode } = require("../../config");
const orderRouter = express.Router();
orderRouter.use(MiddlewareCustomer);
const { ObjectId } = require("mongodb");

orderRouter.get("/", async (req, res) => {
  const orderId = new ObjectId(req.query.orderId);

  const order = await Orders.aggregate([
    {
      $match: {
        _id: orderId,
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

  if (order != null) {
    res.status(responseCode.Success).json({
      message: "Order details",
      order: order,
    });
  } else {
    res
      .status(responseCode.Success)
      .send("Something wrong with server,Please try again after sometime!");
  }
});

// For Customer to place order in the restaurant
// Route for cancel order
/* ************** "http://localhost:3000/user/cart/order/cancel" ***************/
orderRouter.put("/cancel", async (req, res) => {
  const body = req.body;
  const order = await Orders.findByIdAndUpdate(body.orderId, {
    Status: "canceled",
  });
  if (order != null) {
    res.status(responseCode.Success).json({
      message: "Your Order canceled successfully!",
    });
  } else {
    res
      .status(responseCode.Success)
      .send("Your order didn't placed!, Try again");
  }
});

module.exports = { orderRouter };
