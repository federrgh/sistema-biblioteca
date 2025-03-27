const Book = require("../models/libro");
const Author = require("../models/author");

exports.crearLibro = async (req, res) => {
    try {
      const libro = new Book(req.body);
      await libro.save();
      res.status(201).json(libro);
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  };
  
  exports.obtenerLibros = async (req, res) => {
    const libros = await Book.find().populate("autor");
    res.json(libros);
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
