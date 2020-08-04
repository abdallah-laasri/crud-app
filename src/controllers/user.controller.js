"use strict";

const User = require("../models/user.model");

exports.getAll = (req, res) => {
  User.getAll((result) => {
    // res.render("user-index", {
    //   users: result,
    // });
    res.send(result);
  });
};

exports.insert = (req, res) => {
  let data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const new_user = new User(data);
  if (data.constructor === Object && Object.keys(data).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    User.insert(new_user, () => {
      // res.redirect("/");
    });
  }
};

exports.findById = (req, res) => {
  var id = req.params.id;
  User.findById(id, (result) => {
    // res.render("edit", {
    //   user: result[0],
    // });
    res.json(result);
  });
};

exports.update = (req, res) => {
  var id = req.params.id;
  let data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  if (data.constructor === Object && Object.keys(data).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    User.update(id, data, () => {
      // res.redirect("/");
    });
  }
};

exports.delete = (req, res) => {
  let id = req.params.id;
  User.delete(id, () => {
    // res.redirect("/");
  });
};
