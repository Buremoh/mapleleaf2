const express = require("express");
const Booklog = require("../models/booklog");
const router = express.Router();

//All Booklogs Route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const booklogs = await Booklog.find(searchOptions);
    res.render("booklogs/index", {
      booklogs: booklogs,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

// New Booklogs Route
router.get("/new", (req, res) => {
  res.render("booklogs/new", { booklog: new Booklog() });
});

// Create Booklog Route
router.post("/", async (req, res) => {
  const booklog = new Booklog({
    name: req.body.name,
  });
  try {
    const newBooklog = await booklog.save();
    //res.redirect(`/booklogs/${newBooklog.id}`)
    res.redirect(`booklogs`);
  } catch {
    res.render("booklogs/new", {
      booklog: booklog,
      errorMessage: "Error creating Booklog",
    });
  }
});

module.exports = router;
