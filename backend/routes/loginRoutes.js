const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.post("/login", loginController.login);
router.post("/register", loginController.register); // Para pruebas
router.get("/", loginController.getAllLogins); // Ruta para listar logins
router.put("/login/:id", loginController.updateLogin);  // Actualizar usuario
router.delete("/login/:id", loginController.deleteLogin); // Eliminar usuario


module.exports = router;
