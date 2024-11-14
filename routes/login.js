var express = require("express");
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render("login", { title: "Login", user: req.session.user });
});
    
/* POST login page. */
router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
});

module.exports = router;