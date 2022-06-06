const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const routes = require("./src/routes/userRoutes");

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);
app.use(passport.initialize());

require("./passport")(passport);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on PORT: ${PORT}`));
