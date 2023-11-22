const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const User = require("../../models/User"); //引入User
const passport = require("passport");

router.post("/register", (req, res) => {
  const { email, name, password, identity } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json("郵箱已被註冊");
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      const newUser = new User({
        name,
        email,
        avatar,
        password,
        identity,
      });

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    console.log(user);
    if (!user) {
      return res.status(404).json({ email: "用戶不存在" });
    }

    // 密碼匹配
    bcrypt.compare(password, user.password).then((isMatch) => {
      console.log(isMatch);
      if (isMatch) {
        const { id, name, avatar, identity } = user;
        const rule = { id, name, avatar, identity };
        jwt.sign(rule, keys.secretOrkey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({
            sucess: true,
            token: "Bearer " + token,
          });
        });
      } else {
        return res.status(400).json({ password: "密碼錯誤" });
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, name, email, identity } = req.user;
    res.json({ id, name, email, identity });
  }
);

module.exports = router;
