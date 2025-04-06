import { gql, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const REPORTE_AUTOR_QUERY = gql`
  query ObtenerReporteAutor($cedula: String!) {
    reporteAutor(cedula: $cedula) {
      nombre
      libros {
        titulo
        isbn
        editorial
        genero
        anioPublicacion
      }
    }
  }
`;

const Report = () => {
  const { user } = useAuth();
  const [cedula, setCedula] = useState("");
  const [error, setError] = useState("");

  const [getReporteAutor, { data, loading, error: gqlError }] = useLazyQuery(REPORTE_AUTOR_QUERY);

  useEffect(() => {
    if (!user || user.tipo !== "user") {
      setError("No tienes permisos para acceder a esta página.");
    }
  }, [user]);

  const obtenerReporte = () => {
    if (!cedula) {
      setError("Ingresa una cédula válida.");
      return;
    }

    setError("");
    getReporteAutor({ variables: { cedula } });
  };

  const reporte = data?.reporteAutor;

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 font-[Poppins] text-white">
      <div className="w-full max-w-md rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-cyan-400">Reporte de Autores</h2>
          <p className="mt-1 text-sm text-gray-300">Consulta los libros de un autor</p>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Ingrese la cédula"
            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />
        </div>

        <button
          onClick={obtenerReporte}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-center font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          {loading ? "Cargando..." : "Generar Reporte"}
        </button>

        {(error || gqlError) && (
          <p className="mt-4 text-center text-sm text-red-400">
            {error || "Error al obtener el reporte."}
          </p>
        )}

        {reporte && (
          <div className="mt-6 border-t border-gray-600 pt-4">
            <h3 className="text-lg font-bold text-white">Autor: {reporte.nombre}</h3>
            <h4 className="mt-2 text-md font-semibold text-cyan-300">Libros:</h4>
            <ul className="mt-2 space-y-3">
              {reporte.libros.length > 0 ? (
                reporte.libros.map((libro, index) => (
                  <li
                    key={index}
                    className="rounded-lg border border-gray-600 bg-gray-700 p-3 shadow-sm"
                  >
                    <p><strong className="text-cyan-400">Título:</strong> {libro.titulo || "N/A"}</p>
                    <p><strong className="text-cyan-400">ISBN:</strong> {libro.isbn || "N/A"}</p>
                    <p><strong className="text-cyan-400">Editorial:</strong> {libro.editorial || "Desconocida"}</p>
                    <p><strong className="text-cyan-400">Género:</strong> {libro.genero || "No especificado"}</p>
                    <p><strong className="text-cyan-400">Año de Publicación:</strong> {libro.anioPublicacion ?? "N/A"}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-400">No hay libros para este autor.</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
