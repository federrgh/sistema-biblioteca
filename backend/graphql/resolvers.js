const Libro = require("../models/libro");
const Author = require("../models/author");

const resolvers = {
    obtenerLibros: async () => await Libro.find().populate("autor"),
    obtenerAutores: async () => await Author.find(),
    agregarLibro: async ({ isbn, titulo, editorial, genero, anioPublicacion, autor }) => {
        const nuevoLibro = new Libro({ isbn, titulo, editorial, genero, anioPublicacion, autor });
        return await nuevoLibro.save();
    }
};

module.exports = resolvers;
