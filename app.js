const path = require("path");
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { send } = require("process");
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "laasrimysql",
  database: "mydb",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// set view file
app.set("views", path.join(__dirname, "views"));
// set view engin
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  // var sql =
  // "CREATE TABLE users (id int NOT NULL AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), PRIMARY KEY (id))";
  // var sql = "DROP TABLE persons";
  var sql = "SELECT * from users";
  var query = connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("user index");
    // res.send("home");
    res.render("user-index", {
      users: result,
    });
  });
});

app.get("/add", (req, res) => {
  res.render("add", {
    title: "addition",
  });
});

app.post("/save", (req, res) => {
  let data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  var sql = "INSERT INTO users set ? ";
  var query = connection.query(sql, data, function (err, result) {
    if (err) throw err;
    console.log("user saved");
    res.redirect("/");
  });
});

app.get("/edit/:id", (req, res) => {
  var id = req.params.id;
  var sql = "SELECT * FROM users WHERE id = ?";
  var query = connection.query(sql, id, function (err, result) {
    if (err) throw err;
    console.log("edit user");
    res.render("edit", {
      title: "Update",
      user: result[0],
    });
  });
});

app.post("/update/:id", (req, res) => {
  var id = req.params.id;
  var sql =
    "update users set name='" +
    req.body.name +
    "',  email='" +
    req.body.email +
    "', password='" +
    req.body.password +
    "' where id = '" +
    id +
    "' ";
  var query = connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("user updated");
    res.redirect("/");
  });
});

app.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  var sql = "DELETE FROM users WHERE id = ?";
  var query = connection.query(sql, id, function (err, result) {
    if (err) throw err;
    console.log("user deleted");
    res.redirect("/");
  });
});

app.listen(3000, () => console.log("server is running at port 3000"));
