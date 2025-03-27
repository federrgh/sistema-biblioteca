const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  cedula: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  nacionalidad: String
});

module.exports = mongoose.model("Author", AuthorSchema);
