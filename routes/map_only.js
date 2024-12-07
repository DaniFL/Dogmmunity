const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Middleware para servir archivos estáticos en /public
const publicPath = path.join(__dirname, "../public");
router.use(express.static(publicPath));

// Ruta para puntos de interés
router.get("/puntos-de-interes", (req, res) => {
  const filePath = path.join(publicPath, "puntos_interes.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer puntos de interés:", err);
      res.status(500).send("Error al cargar puntos de interés");
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Ruta para parques
router.get("/parques", (req, res) => {
  const filePath = path.join(publicPath, "parques.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer parques:", err);
      res.status(500).send("Error al cargar parques");
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Ruta para veterinarios/hospitales
router.get("/veterinarios-hospitales", (req, res) => {
  const filePath = path.join(publicPath, "veterinarios_hospitales.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer veterinarios/hospitales:", err);
      res.status(500).send("Error al cargar veterinarios/hospitales");
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Ruta para eventos caninos
router.get("/eventos-caninos", (req, res) => {
  const filePath = path.join(publicPath, "eventos_caninos.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer eventos caninos:", err);
      res.status(500).send("Error al cargar eventos caninos");
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Ruta para usuarios cercanos
router.get("/usuarios-cercanos", (req, res) => {
  const filePath = path.join(publicPath, "usuarios_cercanos.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer usuarios cercanos:", err);
      res.status(500).send("Error al cargar usuarios cercanos");
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Ruta principal que renderiza el mapa
router.get("/", (req, res) => {
  res.render("map_only", {
    title: "Mapa",
    navbar_addr1: "/profile",
    navbar_addr2: "/profile",
    navbar_addr3: "/adiestradores",
    navbar_addr4: "/profile",
    navbar_addr5: "/profile",
    navbar_addr6: "/logout",

    navbar_item1: "Perfil",
    navbar_item2: "Perros",
    navbar_item3: "Adiestradores",
    navbar_item4: "Social",
    navbar_item5: "Ajustes",
    navbar_item6: "Cerrar Sesión",

    sub_navbar_add1: "/dog",
    sub_navbar_add2: "/edit_dog_profile",
    sub_navbar_add3: "/feed_lostdog",
    sub_navbar_add4: "/map_only",
    sub_navbar_add5: "/publicaciones",
    sub_navbar_add6: "/user_info",
    sub_navbar_add7: "/edit_user_profile",
    sub_navbar_add8: "/edit_user_photo",

    sub_navbar_item1: "Mis perros",
    sub_navbar_item2: "Añadir perro",
    sub_navbar_item3: "Perros perdidos",
    sub_navbar_item4: "Mapa",
    sub_navbar_item5: "Publicaciones",
    sub_navbar_item6: "Editar perfil",
    sub_navbar_item7: "Cambiar contraseña",
    sub_navbar_item8: "Cambiar foto de perfil",

    script: "/js/map_only.js",
    user: req.session.user,
  });
});

module.exports = router;
