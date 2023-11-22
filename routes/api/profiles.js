const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");

router.get("/test", (req, res) => {
  const { email, name, password, identity } = req.body;
});

module.exports = router;
