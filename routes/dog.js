var express = require("express");
var router = express.Router();
const { getDogsIdByUserId, getDogById } = require("../db/tables/dogs");

/* GET dog page. */
router.get("/", async function(req, res, next) {
  try {
    // Verificar si el usuario está en sesión
    const userId = req.session.user?.id;
    if (!userId) {
      return res.redirect("/login");
    }

    // Obtener los IDs de los perros asociados al usuario
    const dogIdsResult = await getDogsIdByUserId(userId);
    const dogIds = dogIdsResult.map(dog => dog.id);

    // Obtener los datos de cada perro
    const dogs = [];
    for (const id of dogIds) {
      const dogData = await getDogById(id);
      dogs.push(dogData);
    }

    // Renderizar la página con los datos obtenidos
    res.render("dog", {
      title: "Dog",
      user: req.session.user,
      navbar_addr1: "/profile",
      navbar_addr2: "/profile",
      navbar_addr3: "/adiestradores",
      navbar_addr4: "/profile",
      navbar_addr5: "/logout",

      navbar_item1: "Profile",
      navbar_item2: "Pets",
      navbar_item3: "Adiestradores",
      navbar_item4: "Settings",
      navbar_item5: "Logout",

      sub_navbar_add1: "/dog",
      sub_navbar_add2: "/edit_dog_profile",
      sub_navbar_add3: "/feed_lostdog",
      sub_navbar_add4: "/user_info",
      sub_navbar_add5: "/edit_user_profile",
      sub_navbar_add6: "/edit_user_photo",


      sub_navbar_item1: "My Pet",
      sub_navbar_item2: "Add Pet",
      sub_navbar_item3: "Lost Dogs",
      sub_navbar_item4: "Editar Perfil",
      sub_navbar_item5: "Cambiar Contraseña",
      sub_navbar_item6: "Cambiar Avatar",

      script: "",
      dogs, // Lista de perros para usar en el frontend
    });
  } catch (error) {
    console.error("Error al obtener los datos de los perros del usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;
