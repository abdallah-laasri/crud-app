"use strict";

var connection = require("./../../config/db.config");

const User = function (obj) {
  this.name = obj.name;
  this.email = obj.email;
  this.password = obj.password;
};

User.getAll = function (handler) {
  connection.query("select * from users", (err, result) => {
    if (err) throw err;
    console.log("getAll works");
    handler(result);
  });
};

User.insert = function (obj, handler) {
  connection.query("insert into users set ?", obj, (err, result) => {
    if (err) throw err;
    console.log("insert works");
    handler();
  });
};

User.findById = (id, handler) => {
  connection.query("select * from users where id = ?", id, (err, result) => {
    if (err) throw err;
    console.log("finbyid works");
    handler(result);
  });
};

User.update = function (id, obj, handler) {
  connection.query(
    "update users set name ='" +
      obj.name +
      "', email = '" +
      obj.email +
      "', password = '" +
      obj.password +
      "'  where id = '" +
      id +
      "' ",
    (err, result) => {
      if (err) throw err;
      console.log("update works");
      handler();
    }
  );
};

User.delete = function (id, handler) {
  connection.query("delete from users where id = ?", id, (err, result) => {
    if (err) throw err;
    console.log("delete works");
    handler();
  });
};

module.exports = User;
