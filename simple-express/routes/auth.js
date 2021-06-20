const express = require("express");
const router = express.Router();
router.get("/register", (req, res) => {
  res.render("auth/register");
});
router.post("/register", (req, res) => {
  res.send("這裡是POST register");
});
router.get("/login", function (req, res) {
  res.render("auth/login");
});

module.exports = router;
