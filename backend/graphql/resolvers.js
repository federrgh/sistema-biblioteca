const Libro = require("../models/libro");
const Author = require("../models/author");

const resolvers = {
    obtenerLibros: async () => await Libro.find().populate("autor"),
    obtenerAutores: async () => await Author.find(),
    
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
    }


};

module.exports = resolvers;
