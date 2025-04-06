const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Libro {
        id: ID!
        isbn: String!
        titulo: String!
        editorial: String
        genero: String
        anioPublicacion: Int
        autor: Author
    }

    type Author {
        id: ID!
        cedula: String!
        nombre: String!
        nacionalidad: String
        libros: [Libro]
    }

    type Query {
        obtenerLibros: [Libro]
        obtenerAutores: [Author]
    }

    type Mutation {
        agregarLibro(
            isbn: String!, 
            titulo: String!, 
            editorial: String, 
            genero: String, 
            anioPublicacion: Int, 
            autor: ID!
        ): Libro

        actualizarLibro(
            id: ID!
            isbn: String
            titulo: String
            editorial: String
            genero: String
            anioPublicacion: Int
            autor: ID
        ): Libro

        eliminarLibro(id: ID!): String

        agregarAutor(
            cedula: String!
            nombre: String!
            nacionalidad: String
        ): Author

        actualizarAutor(
            id: ID!
            cedula: String
            nombre: String
            nacionalidad: String
        ): Author

        eliminarAutor(id: ID!): String

    }
`);

module.exports = schema;
