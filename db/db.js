const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Restaurant");

const orderSchema = mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  orderQty: {
    type: Number,
    required: true,
  },
  orderPrice: {
    type: Number,
    required: true,
  },
  Status: {
    type: String,
    required: true,
    default: "pending",
  },
});
const Orders = mongoose.model("Orders", orderSchema);

const inventorySchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  itemQty: {
    type: Number,
    required: true,
  },
  threshold: {
    type: Number,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
});
const Inventory = mongoose.model("Inventory", inventorySchema);

const reservationSchema = mongoose.Schema({
  resTbl: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  resDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  resPerson: {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    TotalPersons: {
      type: Number,
      required: true,
    },
  },
  isDone: {
    type: Boolean,
    required: true,
    default: true,
  },
  Status: {
    type: String,
    required: true,
    default: "done",
  },
});
const Reservation = mongoose.model("Reservation", reservationSchema);

const menuItemSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Type: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: String,
    default: true,
  },
});
const MenuItem = mongoose.model("MenuItem", menuItemSchema);

const tableSchema = mongoose.Schema({
  tblNo: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  isBooked: {
    type: Boolean,
    required: true,
    default: false,
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: true,
  },
});
const Table = mongoose.model("Table", tableSchema);

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    length: 8,
  },
  contact: {
    type: Number,
    required: true,
    length: 10,
  },
  role: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);

const customerSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    length: 8,
  },
  contact: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});
const Customer = mongoose.model("Customer", customerSchema);

const reportSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  report: {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    availableQty: {
      type: Number,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    minimumQty: {
      type: Number,
      required: true,
    },
    usedQty: {
      type: Number,
      required: true,
    },
    totalExpense: {
      type: Number,
      required: true,
    },
  },
});
const Report = mongoose.model("Report", reportSchema);

module.exports = {
  Orders,
  Inventory,
  Reservation,
  MenuItem,
  Table,
  User,
  Customer,
  Report,
};
