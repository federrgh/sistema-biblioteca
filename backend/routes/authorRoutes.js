const express = require("express");
const router = express.Router();
const autorController = require("../controllers/authorController");

router.post("/", autorController.crearAutor);
router.get("/", autorController.obtenerAutores);
router.get("/:id", autorController.obtenerAutorPorId);
router.get("/reporte/:cedula", autorController.obtenerAutorPorCedula);
router.put("/:id", autorController.actualizarAutor);
router.delete("/:id", autorController.eliminarAutor);

module.exports = router;

