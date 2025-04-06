import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($user_name: String!, $password: String!) {
    login(user_name: $user_name, password: $password) {
      token
      user {
        id
        user_name
        tipo
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($user_name: String!, $password: String!, $tipo: String!) {
    register(user_name: $user_name, password: $password, tipo: $tipo) {
      mensaje
    }
  }
`;
