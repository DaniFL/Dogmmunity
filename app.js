const express = require('express');
const userController = require('./controllers/authentication.js'); // Controlador de autenticación
const dbConnect = require("./db/connect.js");
const bcrypt = require('bcryptjs');
const session = require('express-session'); // Para manejar sesiones
const path = require('path'); // Para manejar rutas de vistas

// Conexión a MongoDB
dbConnect();


// Server Settings
const app = express();
app.set("port", 3000); 
app.listen(app.get("port"));
console.log("Servidor corriendo en el puerto", app.get("port"));

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Directorio donde estarán tus vistas EJS

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'dogmmunity-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));

// Rutas con EJS
app.get("/", (req, res) => res.render('index'));
app.get("/login", (req, res) => res.render('inicio_sesion'));
app.get("/register", (req, res) => res.render('registro'));

// Ruta del perfil con EJS
app.get("/perfil", (req, res) => {
    if (req.session.user) {
        res.render('perfil', { 
            username: req.session.user.user,
            email: req.session.user.email
        }); // Pasamos el nombre de usuario al EJS
    } else {
        res.redirect('/login');
    }
});

app.get("/edit", (req, res) => res.render('editar_perfil'));
app.get("/sesion_cerrada", (req, res) => res.render('sesion_cerrada'));

// Nuevas rutas POST para manejo de formularios
app.post('/edit', userController.updateUserPassword);
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);

// Ruta para cerrar sesión
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Error al destruir la sesión: ", err);
            return res.status(500).send('Error al cerrar sesión');
        }
        res.clearCookie('connect.sid', { path: '/' }); // Limpia la cookie de la sesión
        res.status(200).send('Sesión cerrada correctamente');
    });
});
