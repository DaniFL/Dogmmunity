var express = require("express");
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res, next) {
    res.render("register", { title: "Register", user: req.session.user });
});
    
/* POST register page. */
router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
});

module.exports = router;
