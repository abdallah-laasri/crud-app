const path = require("path");
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { send } = require("process");
const app = express();
const user = require("./src/models/user.model");
const controller = require("./src/controllers/user.controller");

// var sql =
// "CREATE TABLE users (id int NOT NULL AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), PRIMARY KEY (id))";
// var sql = "DROP TABLE persons";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", controller.getAll);
app.post("/insert", controller.insert);
app.get("/edit/:id", controller.edit);
app.post("/update/:id", controller.update);
app.get("/delete/:id", controller.delete);

app.get("/add", (req, res) => {
  res.render("add");
});

app.listen(3000, () => console.log("server is running at port 3000"));
