var express = require("express");
var router = express.Router();
const { getUserById, deleteUser } = require("../db/tables/users");
const { deleteDogsByOwnerId, markDogAsFound } = require("../db/tables/dogs");
const { getReportsForUserDogs, getReportById, updateReportStatus } = require('../db/tables/reports');



/* GET profile page. */
router.get("/", async function(req, res, next) {

  try {
    const user = await getUserById(req.session.user.id);
     if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Obtener los reportes relacionados con los perros del usuario
    const reports = await getReportsForUserDogs(req.session.user.id);

    res.render("inbox_profile", {
      title: "Inbox",
      navbar_addr1: "/profile",
      navbar_addr2: "/profile", 
      navbar_addr3: "/adiestradores",
      navbar_addr4: "/profile",
      navbar_addr5: "/profile",
      navbar_addr6: "/logout",

      navbar_item1: "Perfil",
      navbar_item2: "Perros",
      navbar_item3: "Adiestradores",
      navbar_item4: "Social",
      navbar_item5: "Ajustes",
      navbar_item6: "Cerrar Sesión",

      sub_navbar_add1: "/dog",
      sub_navbar_add2: "/edit_dog_profile",
      sub_navbar_add3: "/feed_lostdog",
      sub_navbar_add4: "/map_only",
      sub_navbar_add5: "/publicaciones",
      sub_navbar_add6: "/user_info",
      sub_navbar_add7: "/edit_user_profile",
      sub_navbar_add8: "/edit_user_photo",

      sub_navbar_item1: "Mis perros",
      sub_navbar_item2: "Añadir perro",
      sub_navbar_item3: "Perros perdidos",
      sub_navbar_item4: "Mapa",
      sub_navbar_item5: "Publicaciones",
      sub_navbar_item6: "Editar perfil",
      sub_navbar_item7: "Cambiar contraseña",
      sub_navbar_item8: "Cambiar foto de perfil",

      profile_photo: user.photo_path ,
      script: "",
      user: req.session.user,
      reports: reports,
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
  });

module.exports = router;