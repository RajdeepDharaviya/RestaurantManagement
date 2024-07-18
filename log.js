const jwt = require("jsonwebtoken");
const jwtSecret = require("./config");

const token = jwt.sign(
  {
    username: "raj@gmail.com",
    userId: "fldsjflsdfjsdlfjsdflsfjslfjs",
  },
  "raj"
);

const data = jwt.verify(token, "raj");
console.log(data);
