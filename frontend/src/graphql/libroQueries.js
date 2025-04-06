// graphql/libros.js
import { gql } from "@apollo/client";

export const GET_LIBROS = gql`
  query {
    obtenerLibros {
      id
      isbn
      titulo
      editorial
      genero
      anioPublicacion
      autor {
        id
        nombre
      }
    }
  }
`;

export const GET_AUTORES = gql`
  query {
    obtenerAutores {
      id
      nombre
    }
  }
`;

export const ADD_LIBRO = gql`
  mutation agregarLibro(
    $isbn: String!
    $titulo: String!
    $editorial: String
    $genero: String
    $anioPublicacion: Int
    $autor: ID!
  ) {
    agregarLibro(
      isbn: $isbn
      titulo: $titulo
      editorial: $editorial
      genero: $genero
      anioPublicacion: $anioPublicacion
      autor: $autor
    ) {
      id
      titulo
      autor {
        id
        nombre
      }
    }
  }
`;

export const UPDATE_LIBRO = gql`
mutation actualizarLibro(
  $id: ID!
  $isbn: String!
  $titulo: String!
  $editorial: String
  $genero: String
  $anioPublicacion: Int
  $autor: ID!
) {
  actualizarLibro(
    id: $id
    isbn: $isbn
    titulo: $titulo
    editorial: $editorial
    genero: $genero
    anioPublicacion: $anioPublicacion
    autor: $autor
  ) {
    id
    titulo
  }
}
`;

export const DELETE_LIBRO = gql`
mutation eliminarLibro($id: ID!) {
  eliminarLibro(id: $id)
}
`;