import { gql } from "@apollo/client";

export const GET_AUTORES = gql`
  query {
    obtenerAutores {
      id
      cedula
      nombre
      nacionalidad
    }
  }
`;

export const ADD_AUTOR = gql`
  mutation agregarAutor($cedula: String!, $nombre: String!, $nacionalidad: String!) {
    agregarAutor(cedula: $cedula, nombre: $nombre, nacionalidad: $nacionalidad) {
      id
      nombre
    }
  }
`;

export const UPDATE_AUTOR = gql`
  mutation actualizarAutor($id: ID!, $cedula: String!, $nombre: String!, $nacionalidad: String!) {
    actualizarAutor(id: $id, cedula: $cedula, nombre: $nombre, nacionalidad: $nacionalidad) {
      id
      nombre
    }
  }
`;

export const DELETE_AUTOR = gql`
  mutation eliminarAutor($id: ID!) {
    eliminarAutor(id: $id)
  }
`;
