var express = require("express");
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res, next) {
    res.render("register", {
      navbar_addr1: "/",
      navbar_addr2: "/login",
      navbar_addr3: "/register",
      navbar_item1: "Home",
      navbar_item2: "Login",
      navbar_item3: "Register",
      user: req.session.user,
    });
});
    
/* POST register page. */
router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
});

module.exports = router;
