const express = require("express");
const User = require("../models/user");
const router = express.Router();

//All Users Route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const users = await User.find(searchOptions);
    res.render("users/index", { users: users, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
});

// New Users Route
router.get("/new", (req, res) => {
  res.render("users/new", { user: new User() });
});

// Create User Route
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
  });
  try {
    const newAuthor = await user.save();
    //res.redirect(`/users/${newUser.id}`)
    res.redirect(`users`);
  } catch {
    res.render("users/new", {
      user: user,
      errorMessage: "Error creating User",
    });
  }
});

module.exports = router;
