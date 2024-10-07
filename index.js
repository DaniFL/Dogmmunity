const express = require('express');
const userController = require('./controllers/authentication.js');
const {connectDB} = require('./mongo.js')
const bcrypt = require('bcryptjs');

//Fix __dirname en caso de usar "type": "modules" en package.json:
//import path from 'path';
//import { fileURLToPath } from 'url';
//const __dirname = path.dirname(fileURLToPath(import.meta.url));

//import {methods as authentication} from "./controllers/authentication.controller.js";

//Conexión mongo
connectDB();

//Server
const app = express();
app.set("port", 3000); //process.env.PORT || 3000
app.listen(app.get("port"));
console.log("Servidor corriendo en el puerto", app.get("port"));

//Configuración
app.use(express.static(__dirname + "/public"));
app.use(express.json());

//Routes
app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));
app.get("/login", (req, res) => res.sendFile(__dirname + "/views/inicio_sesion.html"));
app.get("/register", (req, res) => res.sendFile(__dirname + "/views/registro.html"));
//app.post('/register', register);
//app.post('/login', login);
app.get("/admin", (req, res) => res.sendFile(__dirname + "/views/perfil.html"));


