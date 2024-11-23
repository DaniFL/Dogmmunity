var express = require("express");
var router = express.Router();


/* GET edit_user_photo page. */
router.get("/", function(req, res, next) {
  res.render("edit_user_photo", {
    title: "Edit User Photo",
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
    navbar_item5: "",
    navbar_item6: "Contact",
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