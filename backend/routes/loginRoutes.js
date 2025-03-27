const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.post("/login", loginController.login);
router.post("/register", loginController.register); // Para pruebas

module.exports = router;
