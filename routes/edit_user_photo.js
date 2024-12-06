var express = require("express");
var router = express.Router();
const { updateUser, getUserById } = require("../db/tables/users");



/* GET edit_user_photo page. */
router.get("/", function(req, res, next) {
  res.render("edit_user_photo", {
    title: "Cambiar foto de perfil",
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

    script: "",
    user: req.session.user });
});

/* POST edit_user_photo page. */
router.post("/", async function (req, res, next) {
    try {
        const user = await getUserById(req.session.user.id);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const { fotoPerfil } = req.body;

        if (!fotoPerfil) {
            return res.status(400).json({ error: "No se proporcionó la foto de perfil." });
        }
        
        await updateUser(user.id, { photo_path: fotoPerfil });

        console.log("Usuario actualizado:", user);
        return res.redirect("/profile");
        
    } catch (err) {
        console.error("Error al actualizar la foto de perfil:", err);
        return res.status(500).send("Error al actualizar la foto de perfil. Por favor, intenta nuevamente más tarde.");
    }
});


module.exports = router;