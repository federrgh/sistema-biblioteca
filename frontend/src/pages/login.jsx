import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "../graphql/loginMutations";

const Login = () => {
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("user");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginUser, { loading: loginLoading }] = useMutation(LOGIN_MUTATION);
  const [registerUser, { loading: registerLoading }] = useMutation(REGISTER_MUTATION);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { user_name, password },
      });

      if (data?.login) {
        login(data.login.user, data.login.token);
        const tipoUsuario = data.login.user.tipo;

        if (tipoUsuario === "admin") {
          navigate("/admin-dashboard");
        } else if (tipoUsuario === "user") {
          navigate("/user-dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await registerUser({
        variables: { user_name, password, tipo },
      });

      if (data?.register?.mensaje) {
        alert(data.register.mensaje);
        setIsRegistering(false);
      }
    } catch (error) {
      alert("Error al registrarse: " + error.message);
    }
  };

  const isLoading = loginLoading || registerLoading;

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 font-[Poppins] text-white">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-cyan-400">
            {isRegistering ? "Registro de Usuario" : "Bienvenido a Biblioteca"}
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            {isRegistering ? "Crea una cuenta nueva" : "Ingrese sus credenciales"}
          </p>
        </div>

        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            className="w-full rounded bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={user_name}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full rounded bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />

          {isRegistering && (
            <select
              className="w-full rounded bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              disabled={isLoading}
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          )}

          <button
            type="submit"
            className={`w-full rounded px-4 py-2 font-semibold text-white ${
              isRegistering ? "bg-green-600 hover:bg-green-700" : "bg-cyan-600 hover:bg-cyan-700"
            } ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading
              ? "Procesando..."
              : isRegistering
              ? "Registrarse"
              : "Iniciar Sesión"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-400">
          {isRegistering ? (
            <p>
              ¿Ya tienes una cuenta?{" "}
              <button
                className="text-cyan-400 hover:underline"
                onClick={() => setIsRegistering(false)}
              >
                Iniciar Sesión
              </button>
            </p>
          ) : (
            <p>
              ¿No tienes una cuenta?{" "}
              <button
                className="text-green-400 hover:underline"
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
