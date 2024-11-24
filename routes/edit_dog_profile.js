var express = require("express");
var router = express.Router();
const { createDog } = require('../db/tables/dogs');

// Middleware para verificar si el usuario ha iniciado sesión
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/login'); // Redirige al usuario a la página de inicio de sesión si no ha iniciado sesión
    }
}

/* GET edit_dog_profile page. */
router.get('/', isAuthenticated, function(req, res, next) {
    res.render('edit_dog_profile', {
        title: 'Edit Dog Profile',
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
        user: req.session.user });
});

/* POST edit_dog_profile page. */
router.post('/', isAuthenticated, async function(req, res, next) {
    const { nombrePerro, edadPerro, pesoPerro, sexo, raza } = req.body;
    const dog = {
        name: nombrePerro,
        breed: raza,
        age: new Date().getFullYear() - new Date(edadPerro).getFullYear(), // Calculate age from birth date
        weight: pesoPerro,
        colour: "", // Assuming colour is not provided in the form
        sex: sexo,
        owner_id: req.session.user.id, // Assuming user ID is stored in session
        photo_dog_perdido: "" // Assuming photo is not provided in the form
    };

    try {
        await createDog(dog);
        res.redirect('/profile'); // Redirect to home or any other page after successful creation
    } catch (error) {
        console.error('Error al crear el perro', error);
        res.status(500).send('Error al crear el perro');
    }
});
    

module.exports = router;