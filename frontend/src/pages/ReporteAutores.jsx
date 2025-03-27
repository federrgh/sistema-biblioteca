import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Report = () => {
    const { user } = useAuth();
    const [cedula, setCedula] = useState("");
    const [reporte, setReporte] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user || user.tipo !== "empleado") {
            setError("No tienes permisos para acceder a esta página.");
        }
    }, [user]);

    const obtenerReporte = async () => {
        if (!cedula) {
            setError("Ingresa una cédula válida.");
            return;
        }

        setError("");

        try {
            const response = await fetch(`http://localhost:3000/author/reporte/${cedula}`);
            const data = await response.json();

            console.log("📌 Respuesta completa del backend:", data);

            if (response.ok) {
                // Verifica si data tiene `libros`
                if (!data.libros || !Array.isArray(data.libros)) {
                    console.warn("⚠️ `libros` no está presente o no es un array en la respuesta.");
                    data.libros = [];
                }

                setReporte({
                    ...data,
                    libros: data.libros || []
                });

                console.log("📌 Estado actualizado - Reporte:", data);
            } else {
                setError("No se encontró información para la cédula ingresada.");
                setReporte(null);
            }
        } catch (error) {
            console.error("❌ Error al obtener el reporte:", error);
            setError("Error al conectar con el servidor.");
        }
    };

    useEffect(() => {
        console.log("📌 Estado actualizado en `reporte`:", reporte);
        console.log("📌 Estado actualizado en `libros`:", reporte?.libros);
    }, [reporte]);

    return (
        <div>
            <h2>Reporte de Autores</h2>
            <input
                type="text"
                placeholder="Ingrese la cédula"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
            />
            <button onClick={obtenerReporte}>Generar Reporte</button>

            {reporte && (
                <div>

                    <h3>Nombre: {reporte.nombre}</h3>
                    <h4>Libros:</h4>
<ul>
    {Array.isArray(reporte?.libros) && reporte.libros.length > 0 ? (
        reporte.libros.map((libro, index) => (
            <li key={index}>
                <strong>{libro || "Sin título"}</strong>
            </li>
        ))
    ) : (
        <p>No hay libros para este autor.</p>
    )}
</ul>

                </div>
            )}

        </div>
    );
};

export default Report;
