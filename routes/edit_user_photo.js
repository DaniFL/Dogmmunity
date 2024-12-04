var express = require("express");
var router = express.Router();


/* GET edit_user_photo page. */
router.get("/", function(req, res, next) {
  res.render("edit_user_photo", {
    title: "Edit User Photo",
    user: req.session.user,
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
    user: req.session.user });
});

/* POST edit_user_photo page. */
router.post("/", async function(req, res, next) {
    const { fotoPerfil, userId } = req.body; // Asegúrate de que el userId se envíe en el cuerpo de la solicitud

    try {
        // Actualiza el campo photo del usuario con el userId proporcionado
        const updatedUser = await User.findByIdAndUpdate(userId, { photo: fotoPerfil }, { new: true });

        if (updatedUser) {
            console.log('Usuario actualizado:', updatedUser); // Imprime el usuario actualizado
            res.status(200).send('Foto de perfil actualizada con éxito');
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (err) {
        console.error('Error al actualizar la foto de perfil:', err);
        res.status(500).send('Error al actualizar la foto de perfil. Por favor, intenta nuevamente más tarde.');
    }
});

module.exports = router;