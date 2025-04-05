const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  cedula: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  nacionalidad: String
});

const Author = mongoose.models.Author || mongoose.model("Author", AuthorSchema);

module.exports = Author;
