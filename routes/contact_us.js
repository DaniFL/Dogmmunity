const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

/* GET index page. */
router.get("/", function (req, res, next) {
  res.render("contact_us", {
    title: "Contacto",
    navbar_addr1: "/",
    navbar_addr2: "/",
    navbar_addr3: "/login",
    navbar_addr4: "/register",
    navbar_addr5: "/about_us",
    navbar_addr6: "/contact_us",

    navbar_item1: "Inicio",
    navbar_item2: "Sobre perros",
    navbar_item3: "Iniciar sesión",
    navbar_item4: "Registrate",
    navbar_item5: "Sobre nosotros",
    navbar_item6: "Contacto",

    sub_navbar_add1: "/feed_lostdog",
    sub_navbar_add2: "/dog_food_advice",
    sub_navbar_add3: "/dog_vision",
    sub_navbar_add4: "/ranking",
    sub_navbar_add5: "/test_duenno",

    sub_navbar_item1: "Perros perdidos",
    sub_navbar_item2: "Alimentación y nutrición",
    sub_navbar_item3: "Simulador de visión perruna",
    sub_navbar_item4: "Rankings",
    sub_navbar_item5: "Test del buen dueño",

    script: "/js/contact_us.js",
    user: req.session.user,
  });
});

module.exports = router;