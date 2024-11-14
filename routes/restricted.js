var express = require("express");
var router = express.Router();

/* GET restricted page. */
router.get("/", function(req, res, next) {
  res.render("restricted", { title: "Restricted", user: req.session.user });
});

module.exports = router;