var express = require("express");
var router = express.Router();

/* GET test page */
router.get("/", function (req, res, next) {
  res.render("test_duenno", {
    title: "¿Eres un buen dueño?",
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
    sub_navbar_add3: "/dog_vision",
    sub_navbar_add4: "/ranking",
    sub_navbar_add5: "/test_duenno",
    sub_navbar_item1: "Perros perdidos",
    sub_navbar_item2: "Alimentación y Nutrición",
    sub_navbar_item3: "Simulador de visión perruna",
    sub_navbar_item4: "Rankings",
    sub_navbar_item5: "Test de dueño",

    script: "/public/js/test_duenno.js", // Referencia al archivo correcto
    user: req.session.user, // Información del usuario
    resultado: null // Aseguramos que no haya resultado antes de calcularlo
  });
});

/* POST test results */
router.post("/", function (req, res, next) {
  // Captura las respuestas del formulario
  const respuestas = {
    q1: req.body.q1,
    q2: req.body.q2,
    q3: req.body.q3,
    q4: req.body.q4,
    q5: req.body.q5,
    q6: req.body.q6,
    q7: req.body.q7,
    q8: req.body.q8
  };

  // Lógica para calcular el resultado
  let score = 0;
  for (let key in respuestas) {
    if (respuestas[key] === 'yes') {
      score++;
    }
  }

  let resultado = '';
  if (score >= 6) {
    resultado = "¡Parece que eres un excelente dueño de perro!";
  } else if (score >= 4) {
    resultado = "¡Eres un buen dueño, pero hay áreas para mejorar!";
  } else {
    resultado = "Es importante mejorar en el cuidado de tu perro.";
  }

  // Renderiza la vista con el resultado
  res.render("test_duenno", {
    title: "¿Eres un buen dueño?",
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
    sub_navbar_add3: "/dog_vision",
    sub_navbar_add4: "/ranking",
    sub_navbar_item1: "Perros perdidos",
    sub_navbar_item2: "Alimentación y Nutrición",
    sub_navbar_item3: "Simulador de visión perruna",
    sub_navbar_item4: "Rankings",

    script: "/public/js/test_duenno.js", // Referencia al archivo correcto
    user: req.session.user, // Información del usuario
    resultado: resultado, // Pasa el resultado al frontend
    score: score // Pasa el puntaje al frontend
  });
});

module.exports = router;
