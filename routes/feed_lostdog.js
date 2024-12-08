var express = require("express");
var router = express.Router();
const { createDog, getLostDogs, declareLostDog, getUserDogs, getEmailByDogId } = require("../db/tables/dogs");
const { createReport } = require('../db/tables/reports'); // Importa la función para crear reportes

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const nodemailer = require("nodemailer"); // Importa el módulo nodemailer para enviar correos electrónicos


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

router.get("/", async function (req, res, next) {
  try {
    const lostDogs = await getLostDogs(); // Obtener los perros perdidos
    console.log(`Perros perdidos obtenidos: ${lostDogs}`);
    const userDogs = req.session.user ? await getUserDogs(req.session.user.id) : []; // Obtener todos los datos de todos los perros del usuario logueado
    console.log(`Perros del usuario obtenidos: ${userDogs}`);
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
router.post("/", isAuthenticated, upload.single("fotoPerroPerdido"), async function (req, res, next) {

  const { nombrePerro, edadPerro, pesoPerro, sexoPerro, razaPerro, perroId, perroOpciones } = req.body;
  console.log(req.body); // Depuración

  const userId = req.session.user.id;

  // Validar según la opción seleccionada
  if (perroOpciones === "nuevo") { ////////////////////////////////////////// NUEVO ///////////////////////////////////////////////////
    // Validación para un nuevo perro
    if (!req.file) {
      console.log("No se adjuntó un archivo para la foto.");
      return res.status(400).send("Es obligatorio adjuntar una foto del perro.");
    }


    if (!nombrePerro || !edadPerro || !pesoPerro || !sexoPerro || !razaPerro || !req.file) {
      console.log("Faltan campos obligatorios para un nuevo perro");
      console.log(`Campos metidos: ${nombrePerro}, ${edadPerro}, ${pesoPerro}, ${sexoPerro}, ${razaPerro}, ${req.file}`);
      return res.status(400).send("Todos los campos, incluida una foto, son obligatorios para registrar un nuevo perro perdido.");
    }

    const photoFileName = req.file.filename;

        const newDog = {
            name: nombrePerro,
            age: new Date().getFullYear() - new Date(edadPerro).getFullYear(),
            weight: pesoPerro,
            sex: sexoPerro,
            breed: razaPerro,
            is_lost: 1, // Marcamos como perdido
            owner_id: userId,
            photo_dog_perdido: photoFileName,
            colour: "" // Assuming colour is not provided
        };

    try {
      // Crear un nuevo perro
      await createDog(newDog);
      console.log("Nuevo perro perdido registrado exitosamente.");
      return res.redirect("/feed_lostdog");
    } catch (error) {
      console.error("Error al registrar un nuevo perro perdido:", error);
      res.status(500).send("Error al registrar un nuevo perro perdido.");
    }





  } else if (perroOpciones === "registrado") { ////////////////////////////////////////// REGISTRADO ///////////////////////////////////////////////////
    // Validación para un perro registrado
    if (!perroId) {
      console.log("No se seleccionó un perro registrado.");
      return res.status(400).send("Debe seleccionar un perro registrado.");
    }
    try {
      // Declarar perro registrado como perdido
      const userDogs = await getUserDogs(userId);
      const selectedDog = userDogs.find(dog => dog.id === perroId);

      if (!selectedDog) {
        console.log("El perro seleccionado no pertenece al usuario.");
        return res.status(404).send("El perro seleccionado no pertenece al usuario.");
      }

      // Validar si el perro tiene una foto predeterminada
      if (selectedDog.photo_dog_perdido === "00000_scooby_doo_DEFAULT.jpg" && !req.file) {
        console.log("Debe adjuntar una foto para este perro, ya que actualmente tiene la imagen por defecto.");
        return res.status(400).send("Debe adjuntar una foto para este perro, ya que actualmente tiene la imagen por defecto.");
      }

      // Si se subió una nueva foto, usarla; de lo contrario, mantener la foto existente
      const updatedPhoto = req.file ? req.file.filename : selectedDog.photo_dog_perdido;
      const dog = await declareLostDog(perroId, true, updatedPhoto); // Declarar el perro como perdido
      console.log(`Perro registrado marcado como perdido: ${dog}`);
      return res.redirect("/feed_lostdog");
    } catch (error) {
      console.error("Error al marcar perro registrado como perdido:", error);
      res.status(500).send("Error al marcar perro registrado como perdido.");
    }
  } else {
    console.log("Opción inválida en el formulario.");
    res.status(400).send("Opción no válida.");
  }
});



// Ruta para manejar la creación de reportes
router.post('/report_dog', isAuthenticated, upload.single('fotoReporte'), async (req, res) => {
    const { dogId, message, contactInfo } = req.body;
    console.log(req.body);


    // Validar que los campos requeridos estén presentes
    if (!dogId || !message || !contactInfo) {
        console.error('Faltan campos obligatorios en el formulario de reporte');
        return res.status(400).send('Todos los campos son obligatorios para enviar el reporte.');
    }

    try {
        // Crear el objeto del reporte
        const report = {
            dog_id: dogId,
            message: message,
            contact_info: contactInfo,
            reporter_id: req.session.user.id, // ID del usuario que hace el reporte
            photo_dog_encontrado: req.file.filename // Usar el nombre del archivo de la foto
        };

        // Llamar a la función para insertar el reporte en la base de datos
        await createReport(report);
        console.log('Reporte creado exitosamente');


        // Obtener el correo del dueño del perro
        const email_owner = await getEmailByDogId(dogId);

        //Mandar correo avisando al dueño del perro de que alguien ha encontrado a su perro posiblemente
        // Configuración y envío del correo
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user:"dogmmunityapp@gmail.com",
            pass:"getk mqrs nwfz jecv",
          },
        });

        const reportInboxLink = "http://localhost:3000/login"; // Enlace a inicio de sesión para poder acceder al buzón de reportes del usuario
        const mailOptions = {
          from: '"Dogmmunity" <dogmmunityapp@gmail.com>',
          to: email_owner,
          subject: "¡Tienes un nuevo reporte sobre tu perro perdido!",
          html: `
            <p>Hola ${user.username},</p>
            <p>¡Buenas noticias! Alguien ha creado un nuevo reporte sobre uno de tus perros reportados como perdidos en Dogmmunity.</p>
            <p>Te invitamos a revisar los detalles en tu buzón de reportes:</p>
            <a href="${reportInboxLink}">Ir a mi buzón de reportes</a>
            <p>Esperamos que este reporte sea un paso más cerca de reencontrarte con tu peludo amigo.</p>
            <p>¡Estamos contigo! 🐾</p>
            <p>El equipo de Dogmmunity</p>
          `,
        };
    
        await transporter.sendMail(mailOptions);
        console.log(`Mensaje de nuevo reporte enviado a: ${user.username}`);

        // Redirigir de nuevo al feed después del envío exitoso
        res.redirect('/feed_lostdog');
    } catch (error) {
        console.error('Error al crear el reporte:', error);
        res.status(500).send('Hubo un problema al enviar el reporte. Por favor, inténtalo de nuevo.');
    }
});


module.exports = router;