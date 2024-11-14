var express = require("express");
var router = express.Router();

/* GET dog page. */
router.get("/", function(req, res, next) {
  res.render("dog", { title: "Express", user: req.session.user });
});

module.exports = router;