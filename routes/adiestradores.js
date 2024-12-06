var express = require("express");
var router = express.Router();

/* GET index page. */
router.get("/", function(req, res, next) {
  res.render("adiestradores", {
    title: "Portal de adiestradores",
    navbar_addr1: "/profile",
    navbar_addr2: "/profile", 
    navbar_addr3: "/adiestradores",
    navbar_addr4: "/profile",
    navbar_addr5: "/logout",

    navbar_item1: "Profile",
    navbar_item2: "Pets",
    navbar_item3: "Adiestradores",
    navbar_item4: "Settings",
    navbar_item5: "Logout",

    sub_navbar_add1: "/dog",
    sub_navbar_add2: "/edit_dog_profile",
    sub_navbar_add3: "/feed_lostdog",
    sub_navbar_add4: "/user_info",
    sub_navbar_add5: "/edit_user_profile",
    sub_navbar_add6: "/edit_user_photo",

    sub_navbar_item1: "My Pet",
    sub_navbar_item2: "Add Pet",
    sub_navbar_item3: "Lost Dogs",
    sub_navbar_item4: "Editar Perfil",
    sub_navbar_item5: "Cambiar Contraseña",
    sub_navbar_item6: "Cambiar Avatar",
    
    script: "",
    user: req.session.user });
});

module.exports = router;