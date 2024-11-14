const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render("login", {
      navbar_addr1: "/",
      navbar_addr2: "/login",
      navbar_addr3: "/register",
      navbar_item1: "Home",
      navbar_item2: "Login",
      navbar_item3: "Register",
      user: req.session.user,
    });
});
    
/* POST login page */
router.post('/login', async (req, res) => {
    
    let body = req.body;

    Usuario.findOne({ user: body.name }, (erro, usuarioDB)=>{
     if (erro) {
       return res.status(500).json({
          ok: false,
          err: erro
       })
    }
// Verifica que exista un usuario con el mail escrita por el usuario.
   if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        err: {
            message: "Usuario o contraseña incorrectos"
        }
     })
   }
// Valida que la contraseña escrita por el usuario, sea la almacenada en la db
   if (! bcrypt.compareSync(body.password, usuarioDB.password)){
      return res.status(400).json({
         ok: false,
         err: {
           message: "Usuario o contraseña incorrectos"
         }
      });
   }
// Genera el token de autenticación
    let token = jwt.sign({
           usuario: usuarioDB,
        }, process.env.SEED_AUTENTICACION, {
        expiresIn: process.env.CADUCIDAD_TOKEN
    })
    res.json({
        ok: true,
        usuario: usuarioDB,
        token,
    })
})
});

module.exports = router;