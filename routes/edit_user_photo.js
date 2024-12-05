var express = require("express");
var router = express.Router();
const { updateUser, getUserById } = require("../db/tables/users");



/* GET edit_user_photo page. */
router.get("/", function(req, res, next) {
  res.render("edit_user_photo", {
    title: "Edit User Photo",
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