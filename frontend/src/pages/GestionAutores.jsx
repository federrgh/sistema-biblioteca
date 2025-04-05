import { useState, useEffect } from "react";
import axios from "axios";

const GestionAutores = () => {
    const [autores, setAutores] = useState([]);
    const [cedula, setCedula] = useState("");
    const [nombre, setNombre] = useState("");
    const [nacionalidad, setNacionalidad] = useState("");
    const [editando, setEditando] = useState(null);

    // Cargar autores desde el backend
    useEffect(() => {
        obtenerAutores();
    }, []);

    const obtenerAutores = async () => {
        try {
            const response = await axios.get("http://localhost:3000/author");
            setAutores(response.data);
        } catch (error) {
            console.error("Error al obtener autores", error);
        }
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editando) {
            actualizarAutor();
        } else {
            agregarAutor();
        }
    };

    // Agregar un nuevo autor
    const agregarAutor = async () => {
        try {
            const response = await axios.post("http://localhost:3000/author", {
                cedula,
                nombre,
                nacionalidad,
            });
            setAutores([...autores, response.data]);
            limpiarFormulario();
        } catch (error) {
            console.error("Error al agregar autor", error);
        }
    };

    // Editar un autor
    const editarAutor = (autor) => {
        setEditando(autor._id);
        setCedula(autor.cedula);
        setNombre(autor.nombre);
        setNacionalidad(autor.nacionalidad);
    };

    // Actualizar un autor
    const actualizarAutor = async () => {
        try {
            await axios.put(`http://localhost:3000/author/${editando}`, {
                cedula,
                nombre,
                nacionalidad,
            });
            obtenerAutores();
            limpiarFormulario();
        } catch (error) {
            console.error("Error al actualizar autor", error);
        }
    };

    // Eliminar un autor
    const eliminarAutor = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/author/${id}`);
            setAutores(autores.filter((autor) => autor._id !== id));
        } catch (error) {
            console.error("Error al eliminar autor", error);
        }
    };

    // Limpiar el formulario
    const limpiarFormulario = () => {
        setCedula("");
        setNombre("");
        setNacionalidad("");
        setEditando(null);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
                Gestión de Autores
            </h2>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-2">
                    <label className="block text-sm font-medium">Cédula</label>
                    <input
                        type="text"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium">Nombre Completo</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium">Nacionalidad</label>
                    <input
                        type="text"
                        value={nacionalidad}
                        onChange={(e) => setNacionalidad(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {editando ? "Actualizar Autor" : "Agregar Autor"}
                </button>
            </form>

            <h3 className="text-xl font-semibold mb-3">Lista de Autores</h3>
            <ul>
                {autores.map((autor) => (
                    <li
                        key={autor._id}
                        className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded"
                    >
                        <div>
                            <p className="text-lg font-medium">{autor.nombre}</p>
                            <p className="text-sm text-gray-600">Cédula: {autor.cedula}</p>
                            <p className="text-sm text-gray-600">
                                Nacionalidad: {autor.nacionalidad}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => editarAutor(autor)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => eliminarAutor(autor._id)}
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GestionAutores;
