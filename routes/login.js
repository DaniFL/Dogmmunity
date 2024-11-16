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
      script: "/js/post_login.js",
      user: req.session.user,
    });
});
    
/* Método POST login. */
router.post('/', function(req, res, next) {
   User.findOne({ email: req.body.email }, function(err, user) {
      if (err) return next(err);
      if (!user) return res.status(401).send("Usuario no encontrado");
      bcrypt.compare(req.body.password, user.password, function(err, result) {
         if (err) return next(err);
         if (!result) return res.status(401).send("Contraseña incorrecta");
         const token = jwt.sign({ user: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
         req.session.token = token;
         req.session.user = user;
         res.redirect("/perfil");
      });
   });
});
module.exports = router;
