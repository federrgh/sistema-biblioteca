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

    type ReporteAutor {
        nombre: String
        libros: [Libro]
    }

    type LoginUser {
        id: ID!
        user_name: String!
        tipo: String!
    }

    type AuthPayload {
        token: String!
        user: LoginUser!
    }

    type Mensaje {
        mensaje: String!
    }

    type Query {
        obtenerLibros: [Libro]
        obtenerAutores: [Author]
        reporteAutor(cedula: String!): ReporteAutor
        obtenerUsuarios: [LoginUser!]!
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

        login(user_name: String!, password: String!): AuthPayload
        register(user_name: String!, password: String!, tipo: String!): Mensaje

        actualizarUsuario(id: ID!, user_name: String!, password: String, tipo: String!): LoginUser
        eliminarUsuario(id: ID!): String
    }
`);

module.exports = schema;
