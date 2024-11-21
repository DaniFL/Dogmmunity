var express = require("express");
const { createUser, getUserByUsername } = require("../db/tables/users");
const bcrypt = require('bcryptjs');
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res, next) {
    res.render("register", {
      title: "Register",
      navbar_addr1: "/",
      navbar_addr2: "/login",
      navbar_addr3: "/register",
      navbar_item1: "Home",
      navbar_item2: "Login",
      navbar_item3: "Register",
      script: "/js/post_register.js",
      user: req.session.user,
    });
});
    
/* POST register page. */
router.post('/', async function(req, res, next) {
  const { user, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await getUserByUsername(user);
    if (existingUser) {
      return res.render("register", {
        title: "Register",
        navbar_addr1: "/",
        navbar_addr2: "/login",
        navbar_addr3: "/register",
        navbar_item1: "Home",
        navbar_item2: "Login",
        navbar_item3: "Register",
        script: "",
        user: req.session.user,
        error: "El usuario ya existe. Por favor, elija otro nombre de usuario.",
      });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    await createUser(user, email, hashedPassword);

    // Redirigir al login después del registro exitoso
    res.redirect("/profile");
  } catch (err) {
    console.error("Error durante el registro:", err);
    res.status(500).render("register", {
      title: "Register",
      navbar_addr1: "/",
      navbar_addr2: "/login",
      navbar_addr3: "/register",
      navbar_item1: "Home",
      navbar_item2: "Login",
      navbar_item3: "Register",
      script: "/js/post_register.js",
      error: "Hubo un problema al registrar al usuario. Intente de nuevo.",
    });
  }
});

module.exports = router;
