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
            const response = await fetch("http://localhost:3000/api/login/login");
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
        const url = editId ? `http://localhost:3000/api/login/login/${editId}` : "http://localhost:3000/api/login/login";

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
        <div className="p-6">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Gestión de Usuarios</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" name="user_name" placeholder="Usuario" value={form.user_name} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
                <select name="tipo" value={form.tipo} onChange={handleChange}>
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>
                <button type="submit" className="bg-green-600 text-white px-4 py-2">{editId ? "Actualizar" : "Agregar"}</button>
            </form>

            <table className="mt-6 w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th>Usuario</th> <th>Tipo</th> <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario._id} className="border">
                            <td>{usuario.user_name}</td> <td>{usuario.tipo}</td>
                            <td>
                                <button onClick={() => handleEdit(usuario)} className="bg-yellow-500 text-white px-2">✏️</button>
                                <button onClick={() => handleDelete(usuario._id)} className="bg-red-600 text-white px-2">🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestionUsuarios;
