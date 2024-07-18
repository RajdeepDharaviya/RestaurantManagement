const express = require("express");
const orderRoute = express.Router();
const { Orders } = require("../../db/db");
const { responseCode } = require("../../config");
const { MenuItem } = require("../../db/db");
const { MiddlewareCustomer } = require("../../middlewares/middleware");

orderRoute.use(MiddlewareCustomer);

// For Customer to see his/her all orders
// Route for getting orders
/* ************** "http://localhost:3000/user/cart/orders" ***************/
orderRoute.get("/orders", async (req, res) => {
  // Finding record from the database for the particular user using find()
  const orders = await Orders.find({
    customer: req.userId,
  });

  //sendig response to the user
  if (orders) {
    res.status(responseCode.Success).json({
      message: "Orders details",
      orders: orders,
    });
  } else {
    res.status(responseCode.Success).send("You don't have orders yet!");
  }
});

// For Customer to place order in the restaurant
// Route for add orders
/* ************** "http://localhost:3000/user/cart/neworders" ***************/
orderRoute.post("/neworders", async (req, res) => {
  const body = req.body;

  // getting price for particular menuItem
  const price = await MenuItem.findOne({
    _id: body.menuItem,
  });

  const qty = body.orderQty;

  // Calculating price for total order amount
  const Orderprice = qty * price.Price;

  // Inserting data into the database using create ()
  const orders = await Orders.create({
    menuItem: body.menuItem,
    customer: req.userId,
    orderQty: qty,
    orderPrice: Orderprice,
  });

  //sending response to the user
  if (orders) {
    res.status(responseCode.Success).json({
      message: "Your Order Placed!",
      orders: orders,
    });
  } else {
    res
      .status(responseCode.Success)
      .send("Your order didn't placed!, Try again");
  }
});

// For Customer to place order in the restaurant
// Route for add orders
/* ************** "http://localhost:3000/user/cart/order/cancel" ***************/
orderRoute.put("/order/cancel", async (req, res) => {
  const body = req.body;
  const order = await Orders.findByIdAndUpdate(body.orderId, {
    Status: "canceled",
  });
  if (order) {
    res.status(responseCode.Success).json({
      message: "Your Order canceled successfully!",
    });
  } else {
    res
      .status(responseCode.Success)
      .send("Your order didn't placed!, Try again");
  }
});

module.exports = { orderRoute };
