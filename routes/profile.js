var express = require("express");
var router = express.Router();

/* GET profile page. */
router.get("/", function(req, res, next) {
  res.render("profile", {
    title: "Profile",
    navbar_addr1: "/",
    navbar_addr2: "/login",
    navbar_addr3: "/register",
    navbar_item1: "Home",
    navbar_item2: "Login",
    navbar_item3: "Register",
    profile_photo: "/img/img_perfil1.jpg",
    script: "/public/js/edit_profile_pic.js",
    user: req.session.user });
});

module.exports = router;