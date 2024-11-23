var express = require("express");
var router = express.Router();

/* GET lost dog feed page. */
router.get("/", function(req, res, next) {
  res.render("feed_lostdog", {
    title: "Perros perdidos",
    navbar_addr1: "/",
    navbar_addr2: "/login",
    navbar_addr3: "/register",
    navbar_addr4: "/feed_lostdog",
    navbar_item1: "Home",
    navbar_item2: "Login",
    navbar_item3: "Register",
    navbar_item4: "Perros perdidos",
    user: req.session.user });
});

module.exports = router;