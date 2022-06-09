const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./src/model/user");
const config = require("./src/config/dbConfig");

module.exports = (passport) => {
  const opts = {};

  opts.secretOrKey = config.secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.find(
        {
          id: jwt_payload.id,
        },
        (err, user) => {
          if (err) {
            return done(err, false);
          }

          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        }
      );
    })
  );
};
