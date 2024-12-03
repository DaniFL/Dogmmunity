const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

/* GET Puntos de Interés desde JSON */
router.get("/puntos-de-interes", (req, res) => {
  const filePath = path.join(__dirname, "../public/puntos_de_interes.json");
  
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error leyendo el archivo JSON:", err);
      res.status(500).send("Error al obtener los puntos de interés");
    } else {
      res.json(JSON.parse(data)); // Envía los puntos de interés como JSON
    }
  });
});

/* GET index page. */
router.get("/", function(req, res, next) {
  res.render("contact_us", {
    title: "Contact Us",
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
    sub_navbar_add4: "/ranking",
    sub_navbar_item1: "Perros perdidos",
    sub_navbar_item2: "Alimentación y Nutrición",
    sub_navbar_item3: "Simulador de visión perruna",
    sub_navbar_item4: "Rankings",

    
    script: "/js/contact_us.js",
    user: req.session.user });
});

module.exports = router;