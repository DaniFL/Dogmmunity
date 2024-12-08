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
      sub_navbar_item2: "Alimentación y nutrición",
      sub_navbar_item3: "Simulador de visión perruna",
      sub_navbar_item4: "Rankings",
      sub_navbar_item5: "Test del buen dueño",

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
        pass:"stka kufu ntbc onkc",
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
