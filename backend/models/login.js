const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
  user_name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tipo: { type: String, enum: ["administrador", "empleado"], required: true },
});

module.exports = mongoose.model("Login", LoginSchema);
