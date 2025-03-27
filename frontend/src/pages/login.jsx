import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [user_name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/login/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_name, password }),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.user); // Guardamos el usuario en el contexto
                navigate("/dashboard"); // Redirigir después de iniciar sesión
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Error al conectar con el servidor");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center ">
            <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-blue-600">Bienvenido a Biblioteca</h2>
                    <p className="mt-1 text-sm text-gray-500">Ingrese sus credenciales para acceder al sistema</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Usuario"
                            className="w-full rounded-lg border border-gray-300 p-2.5 pl-10 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={user_name}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="w-full rounded-lg border border-gray-300 p-2.5 pl-10 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center font-medium text-white transition-colors
                          ${isLoading ? 'cursor-not-allowed opacity-70' : 'hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300'}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Validando..." : "Iniciar Sesión"}
                    </button>
                </form>

                <div className="mt-8 text-center text-xs text-gray-500">
                    Sistema de Biblioteca Municipal © {new Date().getFullYear()}
                </div>
            </div>
        </div>
    );
};

export default Login;