const path = require("path");
const router = require("express").Router();
const arduinoRoutes = require("./arduinoRoutes.js")

// Arduino routes
router.use("/arduino", arduinoRoutes);


// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
