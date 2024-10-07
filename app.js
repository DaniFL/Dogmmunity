const express = require('express');
const userController = require('./controllers/authentication.js'); // Controlador de autenticación
const dbConnect = require("./db/connect.js");
const bcrypt = require('bcryptjs');
const session = require('express-session'); // Para manejar sesiones

// Conexión a MongoDB
dbConnect();

// Server Settings
const app = express();
app.set("port", 3000); 
app.listen(app.get("port"));
console.log("Servidor corriendo en el puerto", app.get("port"));

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

// Rutas
app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));
app.get("/login", (req, res) => res.sendFile(__dirname + "/views/inicio_sesion.html"));
app.get("/register", (req, res) => res.sendFile(__dirname + "/views/registro.html"));
app.get("/perfil", (req, res) => res.sendFile(__dirname + "/views/perfil.html"));
// Nuevas rutas POST para manejo de formularios
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);