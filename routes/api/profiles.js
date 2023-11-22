const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");

router.get("/test", (req, res) => {
  const { type, describe, income, expend, cash, remark } = req.body;
});

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { type, describe, income, expend, cash, remark } = req.body;

    const profileFields = {};
    if (type) profileFields.type = type;
    if (describe) profileFields.type = describe;
    if (income) profileFields.type = income;
    if (expend) profileFields.type = expend;
    if (cash) profileFields.type = cash;
    if (remark) profileFields.type = remark;

    new Profile(profileFields)
      .save()
      .then((profile) => res.json(profile))
      .catch((err) => console.log(err));
  }
);

module.exports = router;
