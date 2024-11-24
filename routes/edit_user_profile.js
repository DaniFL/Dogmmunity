const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUserById, updateUser } = require("../db/tables/users");

/* GET edit user profile page. */
router.get("/", function (req, res, next) {
  const errorMessage = req.session.error;
  const successMessage = req.session.success;
  req.session.error = null;
  req.session.success = null;

  res.render("edit_user_profile", {
    title: "Edit User Profile",
    navbar_addr1: "/profile",
    navbar_addr2: "",
    navbar_addr3: "/profile",
    navbar_addr4: "/logout",
    navbar_addr5: "/profile",
    navbar_addr6: "/contact_us",

    navbar_item1: "Profile",
    navbar_item2: "",
    navbar_item3: "Settings",
    navbar_item4: "Logout",
    navbar_item5: "Pets",
    navbar_item6: "",

    sub_navbar_add1: "/dog",
    sub_navbar_add2: "/edit_dog_profile",
    sub_navbar_item1: "My Pet",
    sub_navbar_item2: "Add Pet",

    script: "",
    user: req.session.user,
    errorMessage: errorMessage,
    successMessage: successMessage
  });
});

/* POST cambio de contraseña */
router.post("/", async function(req, res, next) {
  const { nuevaContrasena, userId } = req.body; // Asegúrate de que el userId se envíe en el cuerpo de la solicitud

  try {
    console.log(`Intentando cambiar la contraseña para el usuario con ID: ${userId}`);
    const user = await getUserById(userId);
    if (!user) {
      req.session.error = "Usuario no encontrado.";
      console.log("Usuario no encontrado");
      return res.redirect("/edit_user_profile");
    }

    // Verificar que el campo password está presente en el objeto user
    if (!user.password) {
      req.session.error = "No se pudo obtener la contraseña del usuario.";
      console.log("No se pudo obtener la contraseña del usuario");
      return res.redirect("/edit_user_profile");
    }

    const passwordMatch = await bcrypt.compare(nuevaContrasena, user.password);
    if (passwordMatch) {
      req.session.error = "La nueva contraseña no puede ser igual a la anterior.";
      console.log("La nueva contraseña no puede ser igual a la anterior");
      return res.redirect("/edit_user_profile");
    }

    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
    await updateUser(userId, { password: hashedPassword });

    req.session.success = "Contraseña actualizada exitosamente.";
    console.log("Contraseña actualizada exitosamente");
    res.redirect("/profile");
  } catch (err) {
    console.error("Error durante el cambio de contraseña:", err);
    req.session.error = "Hubo un problema al cambiar la contraseña. Intente de nuevo.";
    res.redirect("/edit_user_profile");
  }
});

module.exports = router;