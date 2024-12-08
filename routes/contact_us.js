const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.use(express.json()); // Para procesar solicitudes JSON

router.get("/", function (req, res) {
  res.render("contact_us", {
    title: "Contacto",
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
    user: req.session ? req.session.user : null,
  });
});

router.post("/", async (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;

  if (!nombre || !email || !asunto || !mensaje) {
    return res.status(400).json({
      success: false,
      message: "Todos los campos son obligatorios.",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "El email proporcionado no es válido.",
    });
  }

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "dogmmunityapp@gmail.com",
      pass: "stka kufu ntbc onkc",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Dogmmunity App" <dogmmunityapp@gmail.com>`,
      replyTo: "dogmmunityapp@gmail.com",
      to: email,
      subject: asunto,
      text: mensaje,
      html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Mensaje:</strong> ${mensaje}</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "¡Gracias por tu mensaje! Te contactaremos pronto.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error al enviar tu mensaje. Por favor, intenta más tarde.",
    });
  }
});

module.exports = router;