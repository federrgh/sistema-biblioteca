import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div>
            <h2>Bienvenido, {user?.user_name}</h2>
            <nav>
                <Link to="/dashboard">Inicio</Link>
                {user?.tipo === "empleado" && <Link to="/reporte">Reporte de Autores</Link>}
                <button onClick={logout}>Cerrar Sesión</button>
            </nav>
        </div>
    );
};

export default Dashboard;
