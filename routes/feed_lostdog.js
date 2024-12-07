var express = require("express");
var router = express.Router();
const { createDog, getLostDogs, declareLostDog, getUserDogs } = require("../db/tables/dogs");

// Middleware para verificar si el usuario ha iniciado sesión
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
      return next();
  } else {
      res.redirect('/login'); // Redirige al usuario a la página de inicio de sesión si no ha iniciado sesión
  }
}

router.get("/", async function (req, res, next) {
  try {
    const lostDogs = await getLostDogs(); // Obtener los perros perdidos
    const userDogs = req.session.user ? await getUserDogs(req.session.user.id) : []; // Obtener todos los datos de todos los perros del usuario logueado
    const renderData = {
      title: "Perros perdidos",
      user: req.session.user,
      lost_dogs: lostDogs, // Pasar la lista de perros perdidos al template
      dogs: userDogs,
      script: ""
    };
    if (req.session.user) {
      Object.assign(renderData, {
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
      });
    } else {
      Object.assign(renderData, {
        navbar_addr1: "/",
        navbar_addr2: "/",
        navbar_addr3: "/login",
        navbar_addr4: "/register",
        navbar_addr5: "/about_us",
        navbar_addr6: "/contact_us",
    
        navbar_item1: "Inicio",
        navbar_item2: "Sobre perros",
        navbar_item3: "Iniciar sesión",
        navbar_item4: "Registrate",
        navbar_item5: "Sobre nosotros",
        navbar_item6: "Contacto",
    
        sub_navbar_add1: "/feed_lostdog",
        sub_navbar_add2: "/dog_food_advice",
        sub_navbar_add3: "/dog_vision",
        sub_navbar_add4: "/ranking",
        sub_navbar_add5: "/test_duenno",
    
        sub_navbar_item1: "Perros perdidos",
        sub_navbar_item2: "Alimentación y nutrición",
        sub_navbar_item3: "Simulador de visión perruna",
        sub_navbar_item4: "Rankings",
        sub_navbar_item5: "Test del buen dueño",

      });
    }

    res.render("feed_lostdog", renderData);
  } catch (error) {
    console.error("Error al obtener los perros perdidos", error);
    res.status(500).send("Error al cargar la página de perros perdidos");
  }
});

// Ruta POST para añadir un perro perdido
router.post("/", async function (req, res, next) {
  const { nombrePerro, edadPerro, pesoPerro, sexoPerro, razaPerro, perroId } = req.body;
  const userId = req.session.user ? req.session.user.id : null; // Obtener ID del usuario logueado
  
  if (!userId) {
      return res.status(403).send("Debes estar logueado para declarar un perro perdido.");
  }

  // Validación de los campos obligatorios
  if (!nombrePerro || !edadPerro || !pesoPerro || !sexoPerro || !razaPerro) {
    return res.status(400).send("Todos los campos son obligatorios.");
  }

  try {
      if (perroId) {
          // Si se seleccionó un perro ya registrado
          await declareLostDog(perroId, true); // Llamamos a la función que actualiza el estado del perro como perdido
          return res.redirect("/feed_lostdog"); // Redirigimos al feed de perros perdidos
      } else {
          // Si no se seleccionó un perro registrado, lo añadimos como nuevo perro perdido
          await createDog({
              name: nombrePerro,
              age: edadPerro,
              weight: pesoPerro,
              sex: sexoPerro,
              breed: razaPerro,
              is_lost: 1, // Marcamos este perro como perdido
              owner_id: userId, // Asociamos el perro con el usuario logueado
          });
          return res.redirect("/feed_lostdog"); // Redirigimos al feed de perros perdidos
      }
  } catch (error) {
      console.error("Error al declarar perro perdido:", error);
      res.status(500).send("Error en el servidor al declarar perro perdido");
  }
});
module.exports = router;