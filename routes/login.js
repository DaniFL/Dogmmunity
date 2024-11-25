const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { createUser, getUserByUsername } = require("../db/tables/users");
//const jwt = require("jsonwebtoken");

/* GET login page. */
router.get("/", function (req, res, next) {
  res.render("login", {
    title: "Login",
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
    sub_navbar_item1: "Perros perdidos",
    sub_navbar_item2: "Alimentación y Nutrición",

    
    script: "",
    user: req.session.user,
  });
});

/* POST login page. */
router.post("/", async function (req, res, next) {
  const { username, password } = req.body;

  try {
    const userinput = await getUserByUsername(username);
    if (!userinput) {
      req.session.error = "Usuario incorrecto.";
      console.log("Usuario incorrecto");
      return res.redirect("/login");
    }

    const passwordMatch = await bcrypt.compare(password, userinput.password);
    if (!passwordMatch) {
      req.session.error = "Contraseña incorrecta.";
      console.log("Contraseña incorrecta");
      return res.redirect("/login");
    }

    // Verificar si la cuenta está validada
    if (!userinput.is_verified) {
      req.session.error = "Tu cuenta no está verificada. Revisa tu correo para verificarla.";
      console.log("Cuenta no verificada");
      return res.redirect("/login");
    }

    // Crear sesión de usuario
    req.session.user = {
      id: userinput.id,
      username: userinput.username,
      email: userinput.email,
    };

    console.log("Inicio de sesión exitoso");
    res.redirect("/profile");
    console.log(req.session.user);
  } catch (err) {
    console.error("Error durante el inicio de sesión:", err);
    req.session.error = "Hubo un problema al iniciar sesión. Intente de nuevo.";
    res.redirect("/login");
  }
});

module.exports = router;