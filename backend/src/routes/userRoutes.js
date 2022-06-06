const express = require("express");
const userActions = require("../action/userActions");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello world");
});

router.get("/dashboard", (req, res) => {
  res.send("Dashboard");
});

// @desc Adding new user
// @route POST /addUser
router.post("/addUser", userActions.addNew);

// @desc Authenticate user
// @route POST /authenticate
router.post("/authenticate", userActions.authenticate);

// @desc Get user infomation
// @route GET /getInfo
router.get("/getInfo", userActions.getInfo);

module.exports = router;
