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

router.get("/", (req, res) => {
    res.render("map_only", {
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
      sub_navbar_add4: "/user_info",
      sub_navbar_add5: "/edit_user_profile",
      sub_navbar_add6: "/edit_user_photo",

      sub_navbar_item1: "My Pet",
      sub_navbar_item2: "Add Pet",
      sub_navbar_item3: "Lost Dogs",
      sub_navbar_item4: "Editar Perfil",
      sub_navbar_item5: "Cambiar Contraseña",
      sub_navbar_item6: "Cambiar Avatar",

      profile_photo: "/img/img_perfil1.jpg",
      script: "/js/map_only.js",
      user: req.session.user,
    });
  });
  

module.exports = router;
