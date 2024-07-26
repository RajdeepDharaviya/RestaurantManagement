const express = require("express");
const orderRoute = express.Router();
const { Orders } = require("../../db/db");
const { responseCode } = require("../../config");
const { Middleware } = require("../../middlewares/middleware");

orderRoute.use(Middleware);
// Route for orders details
/* ************** "http://localhost:3000/admin/orders" ***************/
orderRoute.get("/", async (req, res) => {
  const orders = await Orders.aggregate([
    {
      $lookup: {
        from: "customers",
        let: { cusId: "$customer" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$_id", "$cusId"] },
            },
          },
          {
            $project: {
              _id: 0,
              firstname: "$firstname",
              lastname: "$lastname",
              address: "$address",
              contact: "$contact",
            },
          },
        ],
        as: "CustomerDetails",
      },
    },
    {
      $lookup: {
        from: "menuitems",
        localField: "menuItem",
        foreignField: "_id",
        as: "menuItemDetails",
      },
    },
    {
      $match: {
        Status: "pending", // Our extra condition: only pending orders!
      },
    },
    {
      $project: {
        _id: 1,
        orderQty: 1,
        orderPrice: 1,
        Status: 1,
        CustomerDetails: 1,
        menuItem: "$menuItemDetails.Name",
      },
    },
  ]);
  const order = orders[0];

  const orderDetails = {
    Name:
      order.CustomerDetails[0].firstname + order.CustomerDetails[0].lastname,
    Item: order.menuItem,
    Status: order.Status,
    orderQty: order.orderQty,
    orderPrice: order.orderPrice,
    contact: order.CustomerDetails[0].contact,
    address: order.CustomerDetails[0].address,
  };

  if (orders != null) {
    res.status(responseCode.Success).json({
      message: "Orders details",
      orderDetails: orderDetails,
    });
  } else {
    res.status(responseCode.Success).send("You don't have orders yet!");
  }
});

// Route for orders details
/* ************** "http://localhost:3000/admin/(params)" ***************/
orderRoute.put("/:action", async (req, res) => {
  const action = req.params.action;
  if (action == "cancel") {
    const cancelOrder = await Orders.findByIdAndUpdate(req.body.orderId, {
      Status: "cancel",
    });

    if (action) {
      res.status(responseCode.Success).json({
        message: "Order has been canceled",
      });
    } else {
      res.status(responseCode.InternalServerError).send("Please try again!");
    }
  } else if (action == "done") {
    const cancelOrder = await Orders.findByIdAndUpdate(req.body.orderId, {
      Status: "done",
    });

    if (action) {
      res.status(responseCode.Success).json({
        message: "Order has been completed",
      });
    } else {
      res.status(responseCode.InternalServerError).send("Please try again!");
    }
  } else {
    res
      .status(responseCode.BadRequest)
      .send("Please refresh the page and try again");
  }
});
module.exports = { orderRoute };
