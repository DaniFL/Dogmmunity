var express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
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
    const verificationToken = crypto.randomBytes(32).toString("hex");
    await createUser(user, email, hashedPassword,verificationToken);

    //Configuracion Nodemailer para envio de correos
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth:{
        user:"dogmmunityapp@gmail.com",
        pass:"getk mqrs nwfz jecv",
      },
    });
    const verificationLink = `http://localhost:3000/verify/${verificationToken}`;
    const mailOptions = {
      from: '"Dogmmunity" <dogmmunityapp@gmail.com>',
      to: email,
      subject: "Verifica tu cuenta",
      text: "Este es el texto de prueba",
      html: `<p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
             <a href="${verificationLink}">Verificar</a>`,
    };
    
    transporter.sendMail(mailOptions);

    req.session.message = "¡Revisa tu correo para varficicar tu cuenta.!";
    res.redirect('/login');
  } catch (error) {
    req.session.error = "Hubo un error durante el registro. Inténtalo de nuevo.";
    res.redirect('/register');
  }
});

module.exports = router;
