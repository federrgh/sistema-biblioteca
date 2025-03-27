import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/ReporteAutores";

const App = () => {
    const { user } = useAuth();

    return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
                <Route path="/reporte" element={user && user.tipo === "empleado" ? <Report /> : <Navigate to="/" />} />
            </Routes>
    );
};

export default App;


