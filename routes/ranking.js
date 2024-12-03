var express = require("express");
var router = express.Router();

/* GET ranking page. */
router.get("/", function (req, res, next) {
  res.render("ranking", {
    title: "Rankings",
    navbar_addr1: "/",
    navbar_addr2: "/",
    navbar_addr3: "/login",
    navbar_addr4: "/register",
    navbar_addr5: "/about_us",
    navbar_addr6: "/contact_us",

    navbar_item1: "Home",
    navbar_item2: "Blog",
    navbar_item3: "Login",
    navbar_item4: "Register",
    navbar_item5: "About Us",
    navbar_item6: "Contact",

    sub_navbar_add1: "/feed_lostdog",
    sub_navbar_add2: "/dog_food_advice",
    sub_navbar_add3: "/dog_vision",
    sub_navbar_add4: "/ranking", // Dirección del enlace "Rankings"

    sub_navbar_item1: "Perros perdidos",
    sub_navbar_item2: "Alimentación y Nutrición",
    sub_navbar_item3: "Simulador de visión perruna",
    sub_navbar_item4: "Rankings", // Nuevo elemento

    nombres: [
        { nombre: "Max", popularidad: 100 },
        { nombre: "Luna", popularidad: 90 },
        { nombre: "Bella", popularidad: 85 },
      ], // Ejemplo de datos para la tabla
      user: req.session.user,
    });
  });
  
  module.exports = router;