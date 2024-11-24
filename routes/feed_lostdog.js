var express = require("express");
var router = express.Router();
const { getLostDogs } = require("../db/tables/dogs");

/* GET lost dog feed page. */
router.get("/", async function (req, res, next) {
  try {
    const lostDogs = await getLostDogs(); // Obtener los perros perdidos
    res.render("feed_lostdog", {
      title: "Perros perdidos",
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
      lost_dogs: lostDogs, // Pasar la lista de perros perdidos al template
    });
  } catch (error) {
    console.error("Error al obtener los perros perdidos", error);
    res.status(500).send("Error al cargar la página de perros perdidos");
  }
});

module.exports = router;
