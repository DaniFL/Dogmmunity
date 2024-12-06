var express = require("express");
var router = express.Router();
const {createDog, getLostDogs } = require("../db/tables/dogs");

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
    const renderData = {
      title: "Perros perdidos",
      user: req.session.user,
      lost_dogs: lostDogs, // Pasar la lista de perros perdidos al template
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

/* POST edit_dog_profile page. */
router.post('/', isAuthenticated, async function(req, res, next) {
  const { nombrePerro, edadPerro, pesoPerro, sexo, raza } = req.body;
  const dog = {
      name: nombrePerro,
      breed: raza,
      age: new Date().getFullYear() - new Date(edadPerro).getFullYear(), // Calculate age from birth date
      weight: pesoPerro,
      colour: "",
      sex: sexo,
      owner_id: req.session.user.id, // Assuming user ID is stored in session
      photo_dog_perdido: "", // Assuming photo is not provided in the form
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
