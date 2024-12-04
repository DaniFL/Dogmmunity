const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Ruta para puntos de interés
router.get("/puntos-de-interes", (req, res) => {
  const filePath = path.join(__dirname, "../js/puntos_interes.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer puntos de interés:", err);
      res.status(500).send("Error al cargar puntos de interés");
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Ruta para usuarios cercanos
router.get("/usuarios-cercanos", (req, res) => {
  const filePath = path.join(__dirname, "../js/usuarios_cercanos.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer usuarios cercanos:", err);
      res.status(500).send("Error al cargar usuarios cercanos");
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Ruta principal para el mapa
router.get("/", (req, res) => {
  res.render("map_only", {
    title: "Mapa Interactivo",
    script: "/js/map_only.js", // Nuevo script para esta página
  });
});

router.get("/", (req, res) => {
    res.render("map_only", {
      title: "Mapa Interactivo",
      script: "/js/map_only.js",
      user: req.session.user || null, // Agrega `user` si existe en la sesión
      navbar_addr1: "/", // Dirección del enlace del navbar (puedes ajustarlo)
      navbar_item1: "Home", // Texto del enlace del navbar
      navbar_addr2: "/about_us", // Ejemplo de más enlaces
      navbar_item2: "About Us", // Texto para About Us
      // Puedes agregar más variables necesarias para el header/footer aquí
    });
  });
  

module.exports = router;
