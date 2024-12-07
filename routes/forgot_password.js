const express = require("express");
const router = express.Router();
const { getUserByEmail } = require("../db/tables/users");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

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

// Ruta para mostrar la página de recuperación de contraseña
router.get("/", (req, res) => {
  res.render("forgot_password", {
    ...baseViewData,
    user: req.session.user,
    error: null,
    success: null,
  });
});

// Ruta para manejar el envío del formulario de recuperación de contraseña
router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await getUserByEmail(email); // Buscar usuario por correo
    if (!user) {
      return res.render("forgot_password", {
        ...baseViewData,
        user: req.session.user,
        error: "El correo ingresado no está registrado.",
        success: null,
      });
    }

    // Caso de éxito: correo encontrado
    const resetLink = `http://localhost:3000/reset_password?token=${user.verification_token}`;

    // Configuración y envío del correo
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user:"dogmmunityapp@gmail.com",
        pass:"getk mqrs nwfz jecv",
      },
    });

    const mailOptions = {
      from: '"Dogmmunity" <dogmmunityapp@gmail.com>',
      to: email,
      subject: "Recuperación de contraseña",
      html: `
        <p>Hola ${user.username},</p>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}">Restablecer contraseña</a>
        <p>Si no solicitaste esto, ignora este correo.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Enlace de recuperación generado: ${resetLink}`);

    // Mostrar mensaje de éxito
    return res.render("forgot_password", {
      ...baseViewData,
      user: req.session.user,
      error: null,
      success: "Se ha enviado un correo con instrucciones para restablecer la contraseña.",
    });
  } catch (err) {
    console.error("Error durante la recuperación de contraseña:", err);
    res.status(500).send("Error en el servidor.");
  }
});

module.exports = router;
