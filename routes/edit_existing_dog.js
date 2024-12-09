var express = require("express");
var router = express.Router();
const { getDogsIdByUserId, updateDog,getUserDogs } = require("../db/tables/dogs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Middleware para verificar si el usuario ha iniciado sesión
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
}

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, "../uploads");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// Ruta para obtener el formulario de edición
router.get("/", isAuthenticated, async (req, res) => {
    
    try {
        const userId = req.session.user.id;
        const dogId = req.query.dogId;
        // Obtener los perros asociados al usuario
        const dogs = await getUserDogs(userId);

        // Verifica que los datos se obtienen correctamente
        console.log("Perros del usuario:", dogs);

        let selectedDog = null;
        if (dogId) {
            selectedDog = dogs.find(dog => dog.id == dogId); // Busca el perro por ID
        }

        if (!dogs || dogs.length === 0) {
            return res.render("edit_existing_dog", {
                title: "Editar perro",
                user: req.session.user,
                dogs: [], // Pasamos una lista vacía si no hay perros
                error: "No tienes perros registrados para editar.",
            });
        }

        res.render("edit_existing_dog", {
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
        user: req.session.user,
        dogs, // Lista de perros para el desplegable
        });
    } catch (error) {
        console.error("Error al obtener los perros para editar:", error);
        res.status(500).send("Error interno del servidor");
    }
});

// Ruta para manejar la edición de un perro seleccionado
router.post("/", isAuthenticated, upload.single("fotoPerro"), async (req, res) => {
    const { dogId, nombrePerro, edadPerro, pesoPerro, sexo, raza } = req.body;
    const photoFileName = req.file ? req.file.filename : null;

    try {
        console.log("Datos recibidos en el POST:", req.body);

        const userId = req.session.user.id;

        // Obtener todos los perros del usuario
        const userDogs = await getUserDogs(userId);
        console.log("Perros obtenidos del usuario:", userDogs);

        // Verificar si el perro pertenece al usuario
        const currentDog = userDogs.find(dog => dog.id == dogId);
        console.log("Perro seleccionado:", currentDog);

        if (!currentDog) {
            console.error("Error: Perro no encontrado o no pertenece al usuario.");
            return res.status(404).send("Perro no encontrado o no pertenece al usuario.");
        }

        // Crear el objeto de actualización solo con los campos proporcionados
        const updatedDog = {
            name: nombrePerro || currentDog.name,
            breed: raza || currentDog.breed,
            age: edadPerro
                ? new Date().getFullYear() - new Date(edadPerro).getFullYear()
                : currentDog.age, // Si está vacío, usa el valor actual
            weight: pesoPerro || currentDog.weight,
            sex: sexo || currentDog.sex,
            photo_dog_perdido: photoFileName || currentDog.photo_dog_perdido,
        };

        console.log("Datos a actualizar:", updatedDog);

        // Actualizar el perro
        await updateDog(dogId, updatedDog);

        res.redirect("/dog");
    } catch (error) {
        console.error("Error al actualizar el perro:", error);
        res.status(500).send("Error interno del servidor");
    }
});



module.exports = router;
