const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { adminRoute } = require("./routes/Admin/index");
const { userRoute } = require("./routes/Customers/index");
const port = 3000;

app.use(bodyParser.json());
app.use("/admin", adminRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`The server started at ${port}`);
});
