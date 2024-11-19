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
      return res.status(400).render("register", {
        error: "El nombre de usuario ya está en uso.",
        navbar_addr1: "/",
        navbar_addr2: "/login",
        navbar_addr3: "/register",
        navbar_item1: "Home",
        navbar_item2: "Login",
        navbar_item3: "Register",
        script: "/js/post_register.js",
        user: req.session.user,
      });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    await createUser(user, email, hashedPassword);

    // Redirigir al usuario a la página de inicio de sesión
    res.redirect('/login');
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).render("register", {
      error:
        "Ocurrió un error al registrar el usuario. Por favor, intenta nuevamente.",
      navbar_addr1: "/",
      navbar_addr2: "/login",
      navbar_addr3: "/register",
      navbar_item1: "Home",
      navbar_item2: "Login",
      navbar_item3: "Register",
      script: "/js/post_register.js",
      user: req.session.user,
    });
  }
});

/* GET validate username */
router.get('/validate/username', async function(req, res, next) {
  const { username } = req.query;
  try {
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.json({ error: 'El nombre de usuario ya está en uso.' });
    }
    res.json({ message: 'El nombre de usuario es válido.' });
  } catch (error) {
    console.error('Error al validar el nombre de usuario:', error);
    res.status(500).json({ error: 'Error al validar el nombre de usuario.' });
  }
});

module.exports = router;
