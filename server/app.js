const express = require("express");
const sequelize = require("sequelize");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const db = require("./db/models");

db.sequelize.sync();

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send();
});

app.use("/api/authors", require("./routes/authors"));
app.use("/api/blogs", require("./routes/blogs"));

module.exports = app;
