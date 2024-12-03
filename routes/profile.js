var express = require("express");
var router = express.Router();
const { deleteUser } = require("../db/tables/users");


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
router.post('/delete_account', async (req, res) => {
  const userId = req.session.user.id;  // Asegúrate de que el ID del usuario esté en la sesión
  
  try {
      // Llamar a la función para eliminar el usuario
      await deleteUser(userId);
      console.log("se ha pegado una ostia");
      req.session.destroy();
      res.redirect('/');
  } catch (error) {
      console.error('Error al eliminar la cuenta: ', error);
      res.status(500).send('Error al eliminar la cuenta');
  }
});

module.exports = router;