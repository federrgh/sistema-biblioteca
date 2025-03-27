const mongoose = require("mongoose");

const LibroSchema = new mongoose.Schema({
    isbn: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    editorial: String,
    genero: String,
    anioPublicacion: Number,
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true }
});

module.exports = mongoose.model("libro", LibroSchema);
