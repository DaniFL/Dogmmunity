var express = require("express");
var router = express.Router();

/* GET profile page. */
router.get("/", function(req, res, next) {
  res.render("profile", {
    title: "Profile",
    navbar_addr1: "/",
    navbar_addr2: "/about_us",
    navbar_addr3: "/login",
    navbar_addr4: "/register",
    navbar_addr5: "",
    navbar_addr6: "/contact_us",

    navbar_item1: "Home",
    navbar_item2: "About Us",
    navbar_item3: "Login",
    navbar_item4: "Register",
    navbar_item5: "",
    navbar_item6: "Contact",
    profile_photo: "/img/img_perfil1.jpg",
    script: "/public/js/edit_profile_pic.js",
    user: req.session.user });
});

module.exports = router;