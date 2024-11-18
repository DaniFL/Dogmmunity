var express = require("express");
var router = express.Router();

/* GET dog page. */
router.get("/", function(req, res, next) {
  res.render("dog", {
    title: "Dog",
    navbar_addr1: "/",
    navbar_addr2: "/login",
    navbar_addr3: "/register",
    navbar_item1: "Home",
    navbar_item2: "Login",
    navbar_item3: "Register",
    script: "",
    nombrePerro: "",
    edadPerro: "",
    pesoPerro: "",
    sexoPerro: "",
    razaPerro: "",
    dueñoPerro: "",
    user: req.session.user });
});

module.exports = router;