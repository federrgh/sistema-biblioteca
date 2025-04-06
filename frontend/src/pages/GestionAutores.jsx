import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import {
  GET_AUTORES,
  ADD_AUTOR,
  UPDATE_AUTOR,
  DELETE_AUTOR
} from "../graphql/autorQueries";

const GestionAutores = () => {
  const { data, loading, refetch } = useQuery(GET_AUTORES);
  const [agregarAutor] = useMutation(ADD_AUTOR);
  const [actualizarAutor] = useMutation(UPDATE_AUTOR);
  const [eliminarAutor] = useMutation(DELETE_AUTOR);

  const [form, setForm] = useState({ cedula: "", nombre: "", nacionalidad: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { cedula, nombre, nacionalidad } = form;

    if (!cedula || !nombre || !nacionalidad) {
      alert("Completa todos los campos");
      return;
    }

    try {
      if (editId) {
        await actualizarAutor({ variables: { id: editId, cedula, nombre, nacionalidad } });
        alert("Autor actualizado");
      } else {
        await agregarAutor({ variables: { cedula, nombre, nacionalidad } });
        alert("Autor agregado");
      }
      setForm({ cedula: "", nombre: "", nacionalidad: "" });
      setEditId(null);
      refetch();
    } catch (error) {
      console.error("Error al guardar autor:", error.message);
    }
  };

  const handleEdit = (autor) => {
    setForm({
      cedula: autor.cedula,
      nombre: autor.nombre,
      nacionalidad: autor.nacionalidad
    });
    setEditId(autor.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este autor?")) return;
    try {
      await eliminarAutor({ variables: { id } });
      refetch();
    } catch (error) {
      console.error("Error al eliminar autor:", error.message);
    }
  };

  if (loading) return <p className="text-white">Cargando autores...</p>;

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white font-[Poppins]">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">Gestión de Autores</h2>

        <form onSubmit={handleSubmit} className="grid gap-4 mb-6">
          <input
            type="text"
            name="cedula"
            placeholder="Cédula"
            value={form.cedula}
            onChange={handleChange}
            className="w-full rounded-lg bg-gray-700 p-2 text-white"
            required
          />
          <input
            type="text"
            name="nombre"
            placeholder="Nombre Completo"
            value={form.nombre}
            onChange={handleChange}
            className="w-full rounded-lg bg-gray-700 p-2 text-white"
            required
          />
          <input
            type="text"
            name="nacionalidad"
            placeholder="Nacionalidad"
            value={form.nacionalidad}
            onChange={handleChange}
            className="w-full rounded-lg bg-gray-700 p-2 text-white"
            required
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 transition"
          >
            {editId ? "Actualizar Autor" : "Agregar Autor"}
          </button>
        </form>

        <h3 className="text-xl font-semibold text-cyan-300 mb-4">Lista de Autores</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {data?.obtenerAutores.map((autor) => (
            <div key={autor.id} className="bg-gray-700 rounded-xl p-4 shadow-md flex justify-between items-start">
              <div>
                <p className="text-lg font-bold text-white">{autor.nombre}</p>
                <p className="text-sm text-gray-300">Cédula: {autor.cedula}</p>
                <p className="text-sm text-gray-300">Nacionalidad: {autor.nacionalidad}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(autor)}
                  className="rounded bg-yellow-500 px-3 py-1 text-black hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(autor.id)}
                  className="rounded bg-red-600 px-3 py-1 text-black hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestionAutores;
