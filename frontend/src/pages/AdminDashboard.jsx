import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-blue-600">Bienvenido, {user?.user_name}</h2>
                    <p className="mt-1 text-sm text-gray-500">Panel de Administración</p>
                </div>

                <nav className="space-y-3">
                <Link
                        to="/admin-dashboard"
                        className="block w-full rounded-lg bg-gray-100 px-4 py-2 text-center font-medium text-gray-700 hover:bg-gray-200"
                    >
                        Inicio
                    </Link>

                    <Link
                        to="/gestion-libros"
                        className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white hover:bg-blue-700"
                    >
                        Gestionar Libros
                    </Link>

                    <Link
                        to="/gestion-autores"
                        className="block w-full rounded-lg bg-purple-600 px-4 py-2 text-center font-medium text-white hover:bg-purple-700"
                    >
                        Gestionar Autores
                    </Link>

                    <Link
                        to="/gestion-usuarios"
                        className="block w-full rounded-lg bg-green-600 px-4 py-2 text-center font-medium text-white hover:bg-green-700"
                    >
                        Gestionar Usuarios
                    </Link>

                    <button
                        onClick={logout}
                        className="mt-4 w-full rounded-lg bg-red-600 px-4 py-2 text-center font-medium text-white hover:bg-red-700"
                    >
                        Cerrar Sesión
                    </button>
                </nav>

                <div className="mt-8 text-center text-xs text-gray-500">
                    Biblioteca Municipal © {new Date().getFullYear()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
