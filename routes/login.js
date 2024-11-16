const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

/* GET login page. */
router.get("/", function (req, res, next) {
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
router.post("/", async function (req, res, next) {
  console.log(req.body);
  const user = req.body.user;
  const password = req.body.password;
  if (!user || !password) {
    return res
      .status(400)
      .send({ status: "Error", message: "Los campos están incompletos" });
  }
  const usuarioVerificar = usuarios.find((usuario) => usuario.user === user);
  if (!usuarioVerificar) {
    return res
      .status(400)
      .send({ status: "Error", message: "Error durante login" });
  }
  const loginCorrecto = await bcryptjs.compare(
    password,
    usuarioVerificar.password
  );
  if (!loginCorrecto) {
    return res
      .status(400)
      .send({ status: "Error", message: "Error durante login" });
  }
  //const token = jsonwebtoken.sign(
  //  { user: usuarioVerificar.user },
  //  process.env.JWT_SECRET,
  //  { expiresIn: process.env.JWT_EXPIRATION }
  //);

  //const cookieOption = {
  //  expires: new Date(
  //    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
  //  ),
  //  path: "/",
  //};
  //res.cookie("jwt", token, cookieOption);
  //res.send({ status: "ok", message: "Usuario loggeado", redirect: "/admin" });
});

module.exports = router;
