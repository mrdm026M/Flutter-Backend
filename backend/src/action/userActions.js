const User = require("../model/user");
const jwt = require("jwt-simple");
const config = require("../config/dbConfig");

const userActions = {
  addNew: (req, res) => {
    if (!req.body.name || !req.body.password || !req.body.email) {
      res.status(403).send({
        success: false,
        msg: "Enter all fields",
      });
    } else {
      const newUser = User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      newUser.save((err) => {
        if (err) {
          res.status(403).send({
            success: false,
            msg: "Failed to save",
          });
        } else {
          res.status(200).send({
            success: true,
            msg: "Successfull",
          });
        }
      });
    }
  },

  authenticate: (req, res) => {
    User.findOne(
      {
        email: req.body.email,
      },
      (err, user) => {
        if (err) {
          throw err;
        }

        if (!user) {
          res.status(403).send({
            success: false,
            msg: "Authentication failed! User not found",
          });
        }

        user.comparePassword(
          req.body.password,
          user.password,
          (error, isMatch) => {
            if (isMatch && !error) {
              const token = jwt.encode(user, config.secret);
              res.status(200).send({
                success: true,
                token: token,
              });
            } else {
              res.status(403).send({
                success: false,
                msg: "Authentication failed! Wrong password",
              });
            }
          }
        );
      }
    );
  },

  getInfo: (req, res) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decodeToken = jwt.decode(token, config.secret);

      return res.status(200).send({
        success: true,
        body: {
          name: decodeToken.name,
          email: decodeToken.email,
        },
      });
    } else {
      return res.status(403).send({
        success: false,
        msg: "No headers found",
      });
    }
  },
};

module.exports = userActions;
