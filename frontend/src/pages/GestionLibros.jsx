import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import {
  GET_LIBROS,
  GET_AUTORES,
  ADD_LIBRO,
  UPDATE_LIBRO,
  DELETE_LIBRO,
} from "../graphql/libroQueries";

const GestionLibros = () => {
  const { data: librosData, loading: loadingLibros, refetch } = useQuery(GET_LIBROS);
  const { data: autoresData } = useQuery(GET_AUTORES);
  const [agregarLibro] = useMutation(ADD_LIBRO);
  const [actualizarLibro] = useMutation(UPDATE_LIBRO);
  const [eliminarLibro] = useMutation(DELETE_LIBRO);

  const [form, setForm] = useState({
    isbn: "",
    titulo: "",
    editorial: "",
    genero: "",
    anioPublicacion: "",
    autor: ""
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "anioPublicacion" ? Number(value) || "" : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isbn, titulo, editorial, genero, anioPublicacion, autor } = form;

    if (!isbn || !titulo || !editorial || !genero || !anioPublicacion || !autor) {
      alert("Completa todos los campos");
      return;
    }

    try {
      if (editId) {
        await actualizarLibro({
          variables: {
            id: editId,
            isbn,
            titulo,
            editorial,
            genero,
            anioPublicacion: parseInt(anioPublicacion),
            autor
          }
        });
        alert("Libro actualizado");
      } else {
        await agregarLibro({
          variables: {
            isbn,
            titulo,
            editorial,
            genero,
            anioPublicacion: parseInt(anioPublicacion),
            autor
          }
        });
        alert("Libro agregado");
      }

      setForm({ isbn: "", titulo: "", editorial: "", genero: "", anioPublicacion: "", autor: "" });
      setEditId(null);
      refetch();
    } catch (error) {
      console.error("Error al guardar libro:", error.message);
    }
  };

  const handleEdit = (libro) => {
    setForm({
      isbn: libro.isbn,
      titulo: libro.titulo,
      editorial: libro.editorial,
      genero: libro.genero,
      anioPublicacion: libro.anioPublicacion,
      autor: libro.autor?.id || ""
    });
    setEditId(libro.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este libro?")) return;

    try {
      await eliminarLibro({ variables: { id } });
      refetch();
    } catch (error) {
      console.error("Error al eliminar libro:", error.message);
    }
  };

  if (loadingLibros) return <p className="text-white">Cargando libros...</p>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white font-[Poppins]">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">Gestión de Libros</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg">
        <input type="text" name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} required className="w-full px-4 py-2 rounded bg-gray-700 text-white" />
        <input type="text" name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required className="w-full px-4 py-2 rounded bg-gray-700 text-white" />
        <input type="text" name="editorial" placeholder="Editorial" value={form.editorial} onChange={handleChange} required className="w-full px-4 py-2 rounded bg-gray-700 text-white" />
        <input type="text" name="genero" placeholder="Género" value={form.genero} onChange={handleChange} required className="w-full px-4 py-2 rounded bg-gray-700 text-white" />
        <input type="number" name="anioPublicacion" placeholder="Año de Publicación" value={form.anioPublicacion} onChange={handleChange} required className="w-full px-4 py-2 rounded bg-gray-700 text-white" />
        <select name="autor" value={form.autor} onChange={handleChange} required className="w-full px-4 py-2 rounded bg-gray-700 text-white">
          <option value="">Selecciona un autor</option>
          {autoresData?.obtenerAutores.map((autor) => (
            <option key={autor.id} value={autor.id}>{autor.nombre}</option>
          ))}
        </select>
        <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded">
          {editId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <table className="mt-10 w-full border-collapse bg-gray-800 rounded-lg overflow-hidden text-left">
        <thead className="bg-gray-700 text-cyan-300">
          <tr>
            <th className="p-3 text-left">ISBN</th>
            <th className="p-3 text-left">Título</th>
            <th className="p-3 text-left">Editorial</th>
            <th className="p-3 text-left">Género</th>
            <th className="p-3 text-left">Año</th>
            <th className="p-3 text-left">Autor</th>
            <th className="p-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {librosData?.obtenerLibros.map((libro) => (
            <tr key={libro.id} className="border-b border-gray-600 hover:bg-gray-700">
              <td className="p-3">{libro.isbn}</td>
              <td className="p-3">{libro.titulo}</td>
              <td className="p-3">{libro.editorial}</td>
              <td className="p-3">{libro.genero}</td>
              <td className="p-3">{libro.anioPublicacion}</td>
              <td className="p-3">{libro.autor?.nombre || "Desconocido"}</td>
              <td className="p-3">
                <button onClick={() => handleEdit(libro)} className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded mr-2">Editar</button>
                <button onClick={() => handleDelete(libro.id)} className="bg-red-600 hover:bg-red-700 text-black px-3 py-1 rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionLibros;
