const express = require("express");
const { Middleware } = require("../../middlewares/middleware");
const { MenuItem } = require("../../db/db");
const { responseCode } = require("../../config");
const mniRouter = express.Router();

mniRouter.use(Middleware);

// Route for getting menuitems is
/* ************** "http://localhost:3000/admin/menuitems/" ***************/
mniRouter.get("/", async (req, res) => {
  const menuItems = await MenuItem.find({});

  if (menuItems) {
    res.status(responseCode.Success).json({
      message: "Menuitems",
      menuItem: menuItems.map((menuItem) => {
        return menuItem;
      }),
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Plwase try again!");
  }
});

// Route for add menuitem is
/* ************** "http://localhost:3000/admin/menuitems/add" ***************/
mniRouter.post("/add", async (req, res) => {
  const body = req.body;

  const menuItem = await MenuItem.create({
    Name: body.Name,
    Description: body.Description,
    Type: body.Type,
    Price: body.Price,
    category: body.category,
  });
  if (menuItem) {
    res.status(responseCode.Success).json({
      message: "Menuitem added successfully!",
      menuItem: menuItem,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Plwase try again!");
  }
});

// Route for Signin is
/* ************** "http://localhost:3000/admin/menuitems/update" ***************/
mniRouter.put("/update", async (req, res) => {
  const body = req.body;

  const menuItem = await MenuItem.findByIdAndUpdate(body.mniId, {
    body,
  });
  if (menuItem) {
    res.status(responseCode.Success).json({
      message: "Menuitem updated successfully!",
      menuItem: menuItem,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Plwase try again!");
  }
});

module.exports = { mniRouter };
