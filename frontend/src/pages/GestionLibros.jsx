import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_LIBROS, GET_AUTORES, ADD_LIBRO } from "../graphql/libroQueries";

const GestionLibros = () => {
    const [libros, setLibros] = useState([]);
    const [form, setForm] = useState({
        isbn: "",  // Cambiado de "ISBN" a "isbn"
        titulo: "",
        editorial: "",
        genero: "",
        anioPublicacion: "",
        autor: "" // Aquí debe ir el ID del autor, no el nombre
    });
    const [autores, setAutores] = useState([]);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLibros();
    }, []);

    useEffect(() => {
        const fetchAutores = async () => {
            const response = await fetch("http://localhost:3000/author");
            const data = await response.json();
            setAutores(data);
        };
        fetchAutores();
    }, []);

    const fetchLibros = async () => {
        try {
            const response = await fetch("http://localhost:3000/libros");
            const data = await response.json();
            setLibros(data);
        } catch (error) {
            console.error("Error al obtener libros", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Convertir anioPublicacion a número
        setForm({ 
            ...form, 
            [name]: name === "anioPublicacion" ? Number(value) || "" : value 
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const libroData = {
            ...form,
            anioPublicacion: Number(form.anioPublicacion) || null // Convertir antes de enviarlo
        };

        console.log("Datos antes de enviar:", form); // <-- Verifica si los datos están completos

        if (!form.isbn || !form.titulo || !form.editorial || !form.genero || !form.anioPublicacion || !form.autor) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        console.log("Enviando libro:", form); // Verificar datos antes de enviar

        try {
            const response = await fetch(`http://localhost:3000/libros/${editId ? editId : ""}`, {
                method: editId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(libroData),
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            if (response.ok) {
                alert(editId ? "Libro actualizado" : "Libro agregado");
                setForm({ isbn: "", titulo: "", editorial: "", genero: "", anioPublicacion: "", autor: "" });
                setEditId(null);
                fetchLibros();
            } else {
                alert("Error al guardar: " + data.mensaje);
            }
        } catch (error) {
            console.error("Error al enviar solicitud:", error);
            alert("Hubo un error al agregar el libro.");
        }
    };



    const handleEdit = (libro) => {
        setForm(libro);
        setEditId(libro._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar este libro?")) return;

        try {
            await fetch(`http://localhost:3000/libros/${id}`, { method: "DELETE" });
            fetchLibros();
        } catch (error) {
            console.error("Error al eliminar el libro", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Gestión de Libros</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} required />
                <input type="text" name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
                <input type="text" name="editorial" placeholder="Editorial" value={form.editorial} onChange={handleChange} required />
                <input type="text" name="genero" placeholder="Género" value={form.genero} onChange={handleChange} required />
                <input type="number" name="anioPublicacion" placeholder="Año de Publicación" value={form.anioPublicacion} onChange={handleChange} required />
                <select name="autor" value={form.autor} onChange={handleChange} required>
                    <option value="">Selecciona un autor</option>
                    {autores.map((autor) => (
                        <option key={autor._id} value={autor._id}>{autor.nombre}</option>
                    ))}
                </select>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2">{editId ? "Actualizar" : "Agregar"}</button>
            </form>
            <table className="mt-6 w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">ISBN</th>
                        <th className="border p-2">Título</th> {/* Nueva columna */}
                        <th className="border p-2">Editorial</th>
                        <th className="border p-2">Género</th>
                        <th className="border p-2">Año</th>
                        <th className="border p-2">Autor</th>
                        <th className="border p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.map((libro) => (
                        <tr key={libro._id} className="border">
                            <td className="border p-2">{libro.isbn || "Sin ISBN"}</td>
                            <td className="border p-2">{libro.titulo || "Sin título"}</td> {/* Mostrar título */}
                            <td className="border p-2">{libro.editorial || "Desconocida"}</td>
                            <td className="border p-2">{libro.genero || "No especificado"}</td>
                            <td className="border p-2">{libro.anioPublicacion ?? "N/A"}</td>
                            <td className="border p-2">{libro.autor?.nombre || "Desconocido"}</td>
                            <td className="border p-2">
                                <button onClick={() => handleEdit(libro)} className="bg-yellow-500 text-white px-2 py-1 mr-2">Editar</button>
                                <button onClick={() => handleDelete(libro._id)} className="bg-red-600 text-white px-2 py-1">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestionLibros;
