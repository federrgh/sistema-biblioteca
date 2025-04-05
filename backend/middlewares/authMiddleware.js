const jwt = require("jsonwebtoken");
const SECRET_KEY = "secreto";  // Usa variables de entorno en producción

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ mensaje: "Acceso denegado" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ mensaje: "Token no válido" });
    }
};

module.exports = verifyToken;
