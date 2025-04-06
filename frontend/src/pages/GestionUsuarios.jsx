import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";

// === CONSULTAS Y MUTACIONES ===

const GET_USUARIOS = gql`
  query {
    obtenerUsuarios {
      id
      user_name
      tipo
    }
  }
`;

const REGISTER_USUARIO = gql`
  mutation Register($user_name: String!, $password: String!, $tipo: String!) {
    register(user_name: $user_name, password: $password, tipo: $tipo) {
      mensaje
    }
  }
`;

const UPDATE_USUARIO = gql`
  mutation ActualizarUsuario($id: ID!, $user_name: String!, $password: String, $tipo: String!) {
    actualizarUsuario(id: $id, user_name: $user_name, password: $password, tipo: $tipo) {
      id
      user_name
      tipo
    }
  }
`;

const DELETE_USUARIO = gql`
  mutation EliminarUsuario($id: ID!) {
    eliminarUsuario(id: $id)
  }
`;

// === COMPONENTE PRINCIPAL ===

const GestionUsuarios = () => {
  const { data, loading, error, refetch } = useQuery(GET_USUARIOS);
  const [register] = useMutation(REGISTER_USUARIO);
  const [actualizarUsuario] = useMutation(UPDATE_USUARIO);
  const [eliminarUsuario] = useMutation(DELETE_USUARIO);

  const [form, setForm] = useState({ user_name: "", password: "", tipo: "user" });
  const [editId, setEditId] = useState(null);

  const usuarios = data?.obtenerUsuarios || [];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await actualizarUsuario({
          variables: {
            id: editId,
            user_name: form.user_name,
            password: form.password || undefined,
            tipo: form.tipo,
          },
        });
      } else {
        await register({
          variables: {
            user_name: form.user_name,
            password: form.password,
            tipo: form.tipo,
          },
        });
      }

      setForm({ user_name: "", password: "", tipo: "user" });
      setEditId(null);
      refetch();
    } catch (err) {
      console.error("Error al guardar el usuario", err.message);
    }
  };

  const handleEdit = (usuario) => {
    setForm({ user_name: usuario.user_name, password: "", tipo: usuario.tipo });
    setEditId(usuario.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      await eliminarUsuario({ variables: { id } });
      refetch();
    } catch (err) {
      console.error("Error al eliminar el usuario", err.message);
    }
  };

  if (loading) return <p className="text-white">Cargando usuarios...</p>;
  if (error) return <p className="text-red-500">Error al cargar usuarios</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-[Poppins]">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-green-400 mb-6">Gestión de Usuarios</h2>

        <form onSubmit={handleSubmit} className="grid gap-4 mb-6">
          <input
            type="text"
            name="user_name"
            placeholder="Usuario"
            value={form.user_name}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-white"
            required={!editId}
          />
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-white"
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-700"
          >
            {editId ? "Actualizar Usuario" : "Agregar Usuario"}
          </button>
        </form>

        <h3 className="text-xl font-semibold text-green-300 mb-3">Lista de Usuarios</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-600 text-left">
            <thead className="bg-gray-700">
              <tr>
                <th className="border border-gray-600 px-4 py-2">Usuario</th>
                <th className="border border-gray-600 px-4 py-2">Tipo</th>
                <th className="border border-gray-600 px-2 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-700">
                  <td className="border border-gray-600 px-4 py-2">{usuario.user_name}</td>
                  <td className="border border-gray-600 px-4 py-2 capitalize">{usuario.tipo}</td>
                  <td className="border border-gray-600 px-2 py-2">
                    <div className="flex gap-1 flex-wrap">
                      <button
                        onClick={() => handleEdit(usuario)}
                        className="rounded bg-yellow-500 px-2 py-1 text-sm font-medium text-black hover:bg-yellow-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(usuario.id)}
                        className="rounded bg-red-600 px-2 py-1 text-sm font-medium text-black hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestionUsuarios;
