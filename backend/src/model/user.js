const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }

      bcrypt.hash(user.password, salt, function (error, hash) {
        if (error) {
          return next(error);
        }

        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = (pass, userPass, cb) => {
  bcrypt.compare(pass, userPass, (err, isMatch) => {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
