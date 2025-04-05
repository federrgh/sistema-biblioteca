const Book = require("../models/libro");
const Author = require("../models/author");

exports.crearLibro = async (req, res) => {
  try {
    console.log("Datos recibidos en el backend:", req.body);
    const libro = new Book(req.body);
    await libro.save();
    res.status(201).json(libro);
  } catch (error) {
    console.error("Error al crear libro:", error);
    res.status(400).json({ mensaje: error.message });
  }
};

exports.obtenerLibros = async (req, res) => {
  try {
    const libros = await Book.find().populate("autor");
    console.log(libros); // Agregar este log para verificar si ISBN está en la base de datos
    res.json(libros);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los libros" });
  }
};

exports.obtenerLibroPorId = async (req, res) => {
  try {
    const libro = await Book.findById(req.params.id).populate("autor");
    if (!libro) return res.status(404).json({ mensaje: "Libro no encontrado" });
    res.json(libro);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.actualizarLibro = async (req, res) => {
  try {
    const libro = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(libro);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.eliminarLibro = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Libro eliminado" });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};
