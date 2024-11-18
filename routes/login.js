const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../db/tables/users");
const router = express.Router();
//const jwt = require("jsonwebtoken");

/* GET login page. */
router.get("/", function (req, res, next) {
  res.render("login", {
    title: "Login",
    navbar_addr1: "/",
    navbar_addr2: "/login",
    navbar_addr3: "/register",
    navbar_item1: "Home",
    navbar_item2: "Login",
    navbar_item3: "Register",
    script: "/js/post_login.js",
    user: req.session.user,
  });
});

/* POST login page. */
router.post("/", async function (req, res, next) {
  const { username, password } = req.body;

  try {
    const user = await User.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // En caso exitoso redirige a la página de perfil
    req.session.user = user;
    //res.status(200).json({ message: 'Inicio de sesión exitoso' });
    res.redirect("/profile");
    
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
