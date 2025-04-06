const Libro = require("../models/libro");
const Author = require("../models/author");
const Login = require("../models/login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "secreto"; // Usa env en producción

module.exports = {
  // Libros
  obtenerLibros: async () => await Libro.find().populate("autor"),

  agregarLibro: async ({ isbn, titulo, editorial, genero, anioPublicacion, autor }) => {
    const nuevoLibro = new Libro({ isbn, titulo, editorial, genero, anioPublicacion, autor });
    await nuevoLibro.save();
    return await Libro.findById(nuevoLibro._id).populate("autor");
  },

  actualizarLibro: async ({ id, ...datos }) => {
    const libroActualizado = await Libro.findByIdAndUpdate(id, datos, { new: true });
    return await libroActualizado.populate("autor");
  },

  eliminarLibro: async ({ id }) => {
    await Libro.findByIdAndDelete(id);
    return "Libro eliminado correctamente.";
  },

  // Autores
  obtenerAutores: async () => await Author.find(),

  agregarAutor: async ({ cedula, nombre, nacionalidad }) => {
    const nuevoAutor = new Author({ cedula, nombre, nacionalidad });
    return await nuevoAutor.save();
  },

  actualizarAutor: async ({ id, ...datos }) => {
    return await Author.findByIdAndUpdate(id, datos, { new: true });
  },

  eliminarAutor: async ({ id }) => {
    await Author.findByIdAndDelete(id);
    return "Autor eliminado correctamente.";
  },

  // Reporte de autor
  reporteAutor: async ({ cedula }) => {
    const autor = await Author.findOne({ cedula });
    if (!autor) return null;

    const libros = await Libro.find({ autor: autor._id });
    return {
      nombre: autor.nombre,
      libros,
    };
  },

  // Login y registro
  login: async ({ user_name, password }) => {
    const user = await Login.findOne({ user_name });
    if (!user) throw new Error("Usuario no encontrado");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Contraseña incorrecta");

    const token = jwt.sign({ id: user._id, tipo: user.tipo }, SECRET_KEY, {
      expiresIn: "2h"
    });

    return {
      token,
      user: {
        id: user._id.toString(),
        user_name: user.user_name,
        tipo: user.tipo,
      }
    };
  },

  register: async ({ user_name, password, tipo }) => {
    const existingUser = await Login.findOne({ user_name });
    if (existingUser) throw new Error("El usuario ya existe");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Login({ user_name, password: hashedPassword, tipo });
    await newUser.save();

    return { mensaje: "Usuario registrado correctamente" };
  },

  // NUEVOS PARA GESTIÓN DE USUARIOS

  obtenerUsuarios: async () => {
    return await Login.find();
  },

  actualizarUsuario: async ({ id, user_name, password, tipo }) => {
    const updateData = { user_name, tipo };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    const updated = await Login.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) throw new Error("Usuario no encontrado");
    return updated;
  },

  eliminarUsuario: async ({ id }) => {
    const deleted = await Login.findByIdAndDelete(id);
    if (!deleted) throw new Error("Usuario no encontrado");
    return "Usuario eliminado correctamente.";
  }
};
