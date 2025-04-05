import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Report from "./pages/ReporteAutores";
import GestionLibros from "./pages/GestionLibros";
import GestionUsuarios from "./pages/GestionUsuarios";
import GestionAutores from "./pages/GestionAutores";


const PrivateRoute = ({ children, role }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/" />;
    }
    if (role && user.tipo !== role) {
        return <Navigate to={user.tipo === "admin" ? "/admin-dashboard" : "/user-dashboard"} />;
    }
    return children;
};

const App = () => {
    const { user } = useAuth();
    return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin-dashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
                <Route path="/user-dashboard" element={<PrivateRoute role="user"><UserDashboard /></PrivateRoute>} />
                <Route path="/reporte" element={<PrivateRoute role="user"><Report /></PrivateRoute>} />
                <Route path="/gestion-libros" element={<GestionLibros />} />
                <Route path="/gestion-usuarios" element={<GestionUsuarios />} />
                <Route path="/gestion-autores" element={<GestionAutores />} />
            </Routes>
    );
};

export default App;


