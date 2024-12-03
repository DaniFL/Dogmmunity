var express = require("express");
var router = express.Router();
const { deleteUser } = require("../db/tables/users");
const { deleteDogsByOwnerId } = require("../db/tables/dogs");

/* GET profile page. */
router.get("/", function(req, res, next) {
  res.render("profile", {
    title: "Profile",
    navbar_addr1: "/profile",
    navbar_addr2: "/profile", 
    navbar_addr3: "/profile",
    navbar_addr4: "/logout",

    navbar_item1: "Profile",
    navbar_item2: "Pets",
    navbar_item3: "Settings",
    navbar_item4: "Logout",

    sub_navbar_add1: "/dog",
    sub_navbar_add2: "/edit_dog_profile",
    sub_navbar_add3: "/feed_lostdog",
    sub_navbar_add4: "/edit_user_profile",
    sub_navbar_add5: "/edit_user_photo",

    sub_navbar_item1: "My Pet",
    sub_navbar_item2: "Add Pet",
    sub_navbar_item3: "Lost Dogs",
    sub_navbar_item4: "Edit Profile",
    sub_navbar_item5: "Edit Photo",

    profile_photo: "/img/img_perfil1.jpg",
    script: "",
    user: req.session.user });
});
/* Ruta para eliminar cuenta */
router.post('/', async (req, res) => {
  console.log('Solicitud POST recibida en /profile');

  if (!req.session.user || !req.session.user.id) {
      console.log('No hay usuario en la sesión');
      return res.status(403).json({ error: 'No autorizado' });
  }

  const userId = req.session.user.id;
  console.log('ID del usuario a eliminar:', userId);

  try {
      await deleteDogsByOwnerId(userId);
      console.log('Perros del usuario eliminados exitosamente');
      await deleteUser(userId);
      req.session.destroy();
      console.log('Usuario eliminado exitosamente');
      res.status(200).json({ message: 'Cuenta eliminada exitosamente' });
  } catch (error) {
      console.error('Error al eliminar la cuenta: ', error);
      res.status(500).json({ error: 'Error al eliminar la cuenta' });
  }
});


module.exports = router;