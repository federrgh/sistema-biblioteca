const User = require("../models/userModel");

exports.crearUsuario = async (req, res) => {
  try {
    const usuario = new User(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.obtenerUsuarios = async (req, res) => {
  const usuarios = await User.find();
  res.json(usuarios);
};

exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.actualizarUsuario = async (req, res) => {
  try {
    const usuario = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

