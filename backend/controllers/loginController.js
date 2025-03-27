const Login = require("../models/login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "secreto"; // Usa una variable de entorno en producción

// LOGIN
exports.login = async (req, res) => {
  const { user_name, password } = req.body;

  try {
    const user = await Login.findOne({ user_name });
    if (!user) {
      return res.status(400).json({ mensaje: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user._id, tipo: user.tipo }, SECRET_KEY, {
      expiresIn: "2h",
    });

    res.json({ token, user: { id: user._id, user_name: user.user_name, tipo: user.tipo } });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

// REGISTRO (para pruebas)
exports.register = async (req, res) => {
  const { user_name, password, tipo } = req.body;

  try {
    let user = await Login.findOne({ user_name });
    if (user) {
      return res.status(400).json({ mensaje: "El usuario ya existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new Login({ user_name, password: hashedPassword, tipo });
    await user.save();

    res.status(201).json({ mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
