const express = require("express");
const router = express.Router();
const bookController = require("../controllers/libroController");

router.post("/", bookController.crearLibro);
router.get("/", bookController.obtenerLibros);
router.get("/:id", bookController.obtenerLibroPorId);
router.put("/:id", bookController.actualizarLibro);
router.delete("/:id", bookController.eliminarLibro);

module.exports = router;

