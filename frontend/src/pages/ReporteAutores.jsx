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

            if (response.ok) {
                setReporte(data);
            } else {
                setError("No se encontró información para la cédula ingresada.");
                setReporte(null);
            }
        } catch (error) {
            setError("Error al conectar con el servidor.");
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-blue-600">Reporte de Autores</h2>
                    <p className="mt-1 text-sm text-gray-500">Consulta los libros de un autor</p>
                </div>

                {/* Input para la cédula */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Ingrese la cédula"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                    />
                </div>

                <button
                    onClick={obtenerReporte}
                    className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    Generar Reporte
                </button>

                {/* Mensaje de error */}
                {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}

                {/* Reporte */}
                {reporte && (
                    <div className="mt-6 border-t border-gray-300 pt-4">
                        <h3 className="text-lg font-bold text-gray-700">Autor: {reporte.nombre}</h3>
                        <h4 className="mt-2 text-md font-semibold text-gray-600">Libros:</h4>
                        <ul className="mt-2 space-y-2">
                            {Array.isArray(reporte.libros) && reporte.libros.length > 0 ? (
                                reporte.libros.map((libro, index) => (
                                    <li key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm">
                                        <p><strong className="text-gray-700">Título:</strong> {libro.titulo || "N/A"}</p>
                                        <p><strong className="text-gray-700">ISBN:</strong> {libro.isbn || "N/A"}</p>
                                        <p><strong className="text-gray-700">Editorial:</strong> {libro.editorial || "Desconocida"}</p>
                                        <p><strong className="text-gray-700">Género:</strong> {libro.genero || "No especificado"}</p>
                                        <p><strong className="text-gray-700">Año de Publicación:</strong> {libro.anioPublicacion ?? "N/A"}</p>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500">No hay libros para este autor.</p>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Report;
