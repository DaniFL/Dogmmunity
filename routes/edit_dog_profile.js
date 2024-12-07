var express = require("express");
var router = express.Router();
const { createDog } = require('../db/tables/dogs');

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Middleware para verificar si el usuario ha iniciado sesión
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/login'); // Redirige al usuario a la página de inicio de sesión si no ha iniciado sesión
    }
}

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Asegúrate de que el directorio "uploads" existe
        const dir = path.join(__dirname, "../uploads");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir); // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName); // Genera un nombre único para el archivo
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error("El archivo debe ser una imagen válida (jpeg, jpg, png, gif)"));
        }
    }
});


/* GET edit_dog_profile page. */
router.get('/', isAuthenticated, function(req, res, next) {
    res.render('edit_dog_profile', {
        title: 'Añadir perro',
        user: req.session.user,
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

/* POST edit_dog_profile page. */
router.post('/', isAuthenticated, upload.single("fotoPerroPerdido"), async function(req, res, next) {
    const { nombrePerro, edadPerro, pesoPerro, sexo, raza } = req.body;
    console.log(req.body); // Depuración

    // Si no se subió una imagen, asignamos la imagen por defecto
    const photoFileName = req.file ? req.file.filename : "00000_scooby_doo_DEFAULT.jpg";

    const dog = {
        name: nombrePerro,
        breed: raza,
        age: new Date().getFullYear() - new Date(edadPerro).getFullYear(), // Calculate age from birth date
        weight: pesoPerro,
        colour: "", // Assuming colour is not provided in the form
        sex: sexo,
        owner_id: req.session.user.id, // Assuming user ID is stored in session
        photo_dog_perdido: photoFileName, // Nombre de la imagen (subida o por defecto)
        is_lost: 0 // Assuming is_lost is provided
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