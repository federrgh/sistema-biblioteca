const Author = require("../models/author");
const Book = require("../models/libro");

exports.crearAutor = async (req, res) => {
  try {
    const autor = new Author(req.body);
    await autor.save();
    res.status(201).json(autor);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.obtenerAutores = async (req, res) => {
  const autores = await Author.find();
  res.json(autores);
};

exports.obtenerAutorPorId = async (req, res) => {
  try {
    const autor = await Author.findById(req.params.id);
    if (!autor) return res.status(404).json({ mensaje: "Autor no encontrado" });
    res.json(autor);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.obtenerAutorPorCedula = async (req, res) => {
  try {
      const cedula = String(req.params.cedula); // 🔥 Asegurar que es String
      //console.log("Cédula recibida (convertida):", cedula);

      const autor = await Author.findOne({ cedula: cedula });
      //console.log("Autor encontrado:", autor);

      if (!autor) {
          return res.status(404).json({ mensaje: "Autor no encontrado" });
      }

      const libros = await Book.find({ autor: autor._id });
      //console.log("Libros del autor:", libros);

      res.json({
          nombre: autor.nombre,
          libros: libros.map((libro) => libro.titulo),
      });
  } catch (error) {
      console.error("Error en la consulta:", error);
      res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

exports.actualizarAutor = async (req, res) => {
  try {
    const autor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(autor);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.eliminarAutor = async (req, res) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Autor eliminado" });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};
