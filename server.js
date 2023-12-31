const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");

const db = require("./config/keys").mongoURL;

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connect"))
  .catch((err) => console.log(err));

// passport初始化
app.use(passport.initialize());

require("./config/passport")(passport); //技巧: 把passport對象傳入 就不用在此寫程式 抽離程式

app.get("/", (req, res) => {});
// 使用routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`sever running on the port ${port}`);
});
