const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // Asegúrate de que bcrypt esté definido
const { getUserByToken, updateUser } = require("../db/tables/users");

const baseViewData = {
  title: "Recuperar contraseña",
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
  sub_navbar_item2: "Alimentación y Nutrición",
  sub_navbar_item3: "Simulador de visión perruna",
  sub_navbar_item4: "Rankings",
  sub_navbar_item5: "Test de dueño",
};

// Ruta para mostrar el formulario de restablecimiento de contraseña
router.get("/", async (req, res) => {
    const { token } = req.query;
  
    try {
      const user = await getUserByToken(token);
      if (!user) {
        return res.render("forgot_password", {
          ...baseViewData,
          error: "El enlace es inválido o ha expirado.",
          success: null,
          user: req.session.user ||null,
        });
      }
  
      res.render("reset_password", {
        ...baseViewData,
        token,
        error: null,
        success: null,
        user: req.session.user || null,
      });
    } catch (err) {
      console.error("Error al cargar el formulario de restablecimiento:", err);
      res.status(500).send("Error en el servidor.");
    }
  });
  
  // Ruta para manejar el restablecimiento de contraseña
  router.post("/", async (req, res) => {
    const { token, nuevaContrasena, confirmarContrasena } = req.body;
  
    try {

      // Validar que las contraseñas coinciden
      if (nuevaContrasena !== confirmarContrasena) {
        return res.render("reset_password", {
          ...baseViewData,
          token,
          error: "Las contraseñas no coinciden.",
          success: null,
          user: req.session.user || null,
        });
      }
      const user = await getUserByToken(token);
      if (!user) {
        return res.status(400).send("Token inválido o expirado.");
      }
  
      const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
      await updateUser(user.id, { password: hashedPassword});
      res.redirect("/login");
      res.render("reset_password", {
        ...baseViewData,
        token: null,
        error: null,
        success: "¡Contraseña actualizada exitosamente!",
        user: req.session.user || null,
      });
    } catch (err) {
      console.error("Error al restablecer la contraseña:", err);
      res.status(500).send("Error en el servidor.");
    }
  });
  
  module.exports = router;