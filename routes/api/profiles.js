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

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find()
      .then((profile) => {
        if (!profile) {
          return res.status(404).json("沒有任何內容");
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ _id: req.params.id })
      .then((profile) => {
        if (!profile) {
          return res.status(404).json("沒有任何內容");
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    if (type) profileFields.type = type;
    if (describe) profileFields.type = describe;
    if (income) profileFields.type = income;
    if (expend) profileFields.type = expend;
    if (cash) profileFields.type = cash;
    if (remark) profileFields.type = remark;

    Profile.findOneAndUpdate(
      { _id: req.params.id },
      { $set: profileFields },
      { new: true }
    ).then((profile) => res.json(profile));
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findByIdAndRemove({ _id: req.params.id })
      .then((profile) => profile.save().then((profile) => res.json(profile)))
      .catch((err) => res.status(404).json("刪除失敗"));
  }
);

module.exports = router;
