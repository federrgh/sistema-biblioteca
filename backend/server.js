const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/biblioteca", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
db.once("open", () => console.log("Conectado a MongoDB"));

// Importar rutas
const autorRoutes = require("./routes/authorRoutes");
const libroRoutes = require("./routes/libroRoutes");
const userRoutes = require("./routes/userRoutes");
const login = require("./routes/loginRoutes")

app.use("/api/login", login);
app.use("/author", autorRoutes);
app.use("/libros", libroRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
