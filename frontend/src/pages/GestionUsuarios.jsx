import { useState, useEffect } from "react";

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ user_name: "", password: "", tipo: "user" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/login");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:3000/api/login/login/${editId}`
      : "http://localhost:3000/api/login/login";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setForm({ user_name: "", password: "", tipo: "user" });
      setEditId(null);
      fetchUsuarios();
    } catch (error) {
      console.error("Error al guardar el usuario", error);
    }
  };

  const handleEdit = (usuario) => {
    setForm({ user_name: usuario.user_name, password: "", tipo: usuario.tipo });
    setEditId(usuario._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      await fetch(`http://localhost:3000/api/login/login/${id}`, { method: "DELETE" });
      fetchUsuarios();
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
    }
  };

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
            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            required
          />
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-white focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
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
      <th className="border border-gray-600 px-4 py-2 text-left">Usuario</th>
      <th className="border border-gray-600 px-4 py-2 text-left">Tipo</th>
      <th className="border border-gray-600 px-2 py-2 text-left w-32 whitespace-nowrap">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {usuarios.map((usuario) => (
      <tr key={usuario._id} className="hover:bg-gray-700">
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
              onClick={() => handleDelete(usuario._id)}
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
