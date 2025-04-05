import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [user_name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const [tipo, setTipo] = useState("user"); // Estado para el tipo de usuario
    const [isRegistering, setIsRegistering] = useState(false); // Agregar estado de registro

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
                login(data.user, data.token); // Guardamos el usuario en el contexto

                if (data.user.tipo === "admin") {
                    navigate("/admin-dashboard");
                } else if (data.user.tipo === "user") {
                    navigate("/user-dashboard");
                } else {
                    navigate("/");
                }
                
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Error al conectar con el servidor");
        } finally {
            setIsLoading(false);
        }
    };

    // Manejar Registro de Usuario
    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/login/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_name, password, tipo }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
                setIsRegistering(false); // Volver a la vista de login
            } else {
                alert(data.mensaje);
            }
        } catch (error) {
            alert("Error al conectar con el servidor");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-blue-600">
                        {isRegistering ? "Registro de Usuario" : "Bienvenido a Biblioteca"}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        {isRegistering ? "Crea una cuenta nueva" : "Ingrese sus credenciales"}
                    </p>
                </div>

                <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
                    {/* Input de Usuario */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Usuario"
                            className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={user_name}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    {/* Input de Contraseña */}
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    {/* Seleccionar tipo de usuario (solo para registro) */}
                    {isRegistering && (
                        <div className="relative">
                            <select
                                className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                disabled={isLoading}
                            >
                                <option value="user">Usuario</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                    )}

                    {/* Botón de Enviar */}
                    <button
                        type="submit"
                        className={`w-full rounded-lg ${isRegistering ? "bg-green-600" : "bg-blue-600"} 
                        px-4 py-2.5 text-center font-medium text-white transition-colors 
                        ${isLoading ? "cursor-not-allowed opacity-70" : "hover:bg-opacity-80 focus:outline-none focus:ring-4 focus:ring-opacity-50"}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Procesando..." : isRegistering ? "Registrarse" : "Iniciar Sesión"}
                    </button>
                </form>

                {/* Cambiar entre Login y Registro */}
                <div className="mt-4 text-center text-sm">
                    {isRegistering ? (
                        <p>
                            ¿Ya tienes una cuenta?{" "}
                            <button
                                className="text-blue-600 hover:underline"
                                onClick={() => setIsRegistering(false)}
                            >
                                Iniciar Sesión
                            </button>
                        </p>
                    ) : (
                        <p>
                            ¿No tienes una cuenta?{" "}
                            <button
                                className="text-green-600 hover:underline"
                                onClick={() => setIsRegistering(true)}
                            >
                                Regístrate
                            </button>
                        </p>
                    )}
                </div>

                <div className="mt-8 text-center text-xs text-gray-500">
                    Biblioteca Municipal © {new Date().getFullYear()}
                </div>
            </div>
        </div>
    );
};

export default Login;