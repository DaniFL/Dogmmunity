const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("prueba", { title: "Prueba" });
});

router.get("/api/videos", (req, res) => {
  const mediaPath = path.join(__dirname, "../public/media");
  
  fs.readdir(mediaPath, (err, files) => {
    if (err) {
      console.error("Error leyendo la carpeta:", err);
      res.status(500).send("Error al cargar los videos.");
      return;
    }

    const videoFiles = files.filter(file => /\.(mp4|webm|mov|avi)$/i.test(file));
    
    res.json(videoFiles.map(file => `/media/${file}`));
  });
});

module.exports = router;