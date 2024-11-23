var express = require("express");
var router = express.Router();

/* GET index page. */
router.get("/", function(req, res, next) {
  res.render("about_us", {
    title: "Home",
    navbar_addr1: "/",
    navbar_addr2: "/login",
    navbar_addr3: "/register",
    navbar_item1: "Home",
    navbar_item2: "Login",
    navbar_item3: "Register",
    script: "",
    user: req.session.user });
});

module.exports = router;