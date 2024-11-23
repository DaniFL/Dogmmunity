var express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { createUser, getUserByUsername } = require("../db/tables/users");

/* GET register page. */
router.get('/', function(req, res, next) {
    res.render("register", {
      title: "Register",
      navbar_addr1: "/",
    navbar_addr2: "/about_us",
    navbar_addr3: "/login",
    navbar_addr4: "/register",
    navbar_addr5: "",
    navbar_addr6: "/contact_us",

    navbar_item1: "Home",
    navbar_item2: "About Us",
    navbar_item3: "Login",
    navbar_item4: "Register",
    navbar_item5: "Blog",
    navbar_item6: "Contact",
      script: "",
      user: req.session.user,
    });
});
    
/* POST register page. */
router.post('/', async (req, res, next) => {
  const { user, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await getUserByUsername(user);
    if (existingUser) {
      req.session.error = "El nombre de usuario ya está en uso.";
      return res.redirect('/register');
    }

    // Crear y guardar el nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(user, email, hashedPassword);
    req.session.message = "¡Registro exitoso!";
    res.redirect('/profile');
  } catch (error) {
    req.session.error = "Hubo un error durante el registro. Inténtalo de nuevo.";
    res.redirect('/register');
  }
});

module.exports = router;
