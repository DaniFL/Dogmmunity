var express = require("express");
var router = express.Router();

/* GET dog page. */
router.get("/", function(req, res, next) {
  res.render("dog", {
    title: "Dog",
    navbar_addr1: "/profile",
    navbar_addr2: "",
    navbar_addr3: "/profile",
    navbar_addr4: "/logout",
    navbar_addr5: "/profile",
    navbar_addr6: "/contact_us",

    navbar_item1: "Profile",
    navbar_item2: "",
    navbar_item3: "Settings",
    navbar_item4: "Logout",
    navbar_item5: "Pets",
    navbar_item6: "",

    sub_navbar_add1: "/dog",
    sub_navbar_add2: "/edit_dog_profile",
    sub_navbar_item1: "My Pet",
    sub_navbar_item2: "Add Pet",

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