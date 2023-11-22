const JwtStrategy = require("passport-jwt").Strategy;
ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, doen) => {
      //   console.log(jwt_payload);
      const { name, id } = jwt_payload;
      User.findById({ id })
        .then((user) => {
          if (user) {
            return doen(null, user); //返回user
          }
          return doen(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
