var express = require("express");
var router = express.Router();

/* GET profile page. */
router.get("/", function(req, res, next) {
  res.render("profile", {
    title: "Profile",
    navbar_addr1: "/profile",
    navbar_addr2: "/profile", 
    navbar_addr3: "/profile",
    navbar_addr4: "/logout",

    navbar_item1: "Profile",
    navbar_item2: "Pets",
    navbar_item3: "Settings",
    navbar_item4: "Logout",

    sub_navbar_add1: "/dog",
    sub_navbar_add2: "/edit_dog_profile",
    sub_navbar_add3: "/feed_lostdog",
    sub_navbar_add4: "/edit_user_profile",
    sub_navbar_add5: "/edit_user_photo",

    sub_navbar_item1: "My Pet",
    sub_navbar_item2: "Add Pet",
    sub_navbar_item3: "Lost Dogs",
    sub_navbar_item4: "Edit Profile",
    sub_navbar_item5: "Edit Photo",

    profile_photo: "/img/img_perfil1.jpg",
    script: "/public/js/edit_profile_pic.js",
    user: req.session.user });
});

module.exports = router;