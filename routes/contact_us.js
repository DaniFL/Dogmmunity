const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Endpoint para puntos de interés
router.get("/puntos-de-interes", (req, res) => {
  const filePath = path.join(__dirname, "../public/puntos_interes.json");
  console.log("Leyendo archivo JSON desde:", filePath);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error leyendo el archivo JSON:", err);
      res.status(500).send("Error al leer el archivo JSON");
      return;
    }

    try {
      const jsonData = JSON.parse(data); // Intenta parsear el archivo
      console.log("Contenido del JSON:", jsonData); // Muestra los datos en consola
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error de formato en el JSON:", parseError);
      res.status(500).send("El archivo JSON tiene un formato inválido");
    }
  });
});

// Endpoint para usuarios cercanos
router.get("/usuarios-cercanos", (req, res) => {
  const filePath = path.join(__dirname, "../public/usuarios_cercanos.json");
  console.log("Leyendo archivo JSON desde:", filePath);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error leyendo el archivo JSON de usuarios cercanos:", err);
      res.status(500).send("Error al leer el archivo JSON de usuarios cercanos");
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      console.log("Contenido del JSON de usuarios cercanos:", jsonData);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error de formato en el JSON de usuarios cercanos:", parseError);
      res.status(500).send("El archivo JSON de usuarios cercanos tiene un formato inválido");
    }
  });
});

// Endpoint para eventos caninos
router.get("/eventos-caninos", (req, res) => {
  const filePath = path.join(__dirname, "../public/eventos_caninos.json");
  console.log("Leyendo archivo JSON desde:", filePath);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error leyendo el archivo JSON de eventos caninos:", err);
      res.status(500).send("Error al leer el archivo JSON de eventos caninos");
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      console.log("Contenido del JSON de eventos caninos:", jsonData);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error de formato en el JSON de eventos caninos:", parseError);
      res.status(500).send("El archivo JSON de eventos caninos tiene un formato inválido");
    }
  });
});

/* GET index page. */
router.get("/", function (req, res, next) {
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
    sub_navbar_add5: "/test_duenno",
    sub_navbar_item1: "Perros perdidos",
    sub_navbar_item2: "Alimentación y Nutrición",
    sub_navbar_item3: "Simulador de visión perruna",
    sub_navbar_item4: "Rankings",
    sub_navbar_item5: "Test de dueño",

    script: "/js/contact_us.js",
    user: req.session.user,
  });
});

module.exports = router;
