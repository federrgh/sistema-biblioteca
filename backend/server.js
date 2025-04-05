const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // Cargar variables de entorno

//graphQL
const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const { graphqlHTTP } = require("express-graphql");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB
console.log("URI de MongoDB:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch(error => console.error("Error al conectar con MongoDB Atlas:", error));

// Importar rutas REST
const autorRoutes = require("./routes/authorRoutes");
const libroRoutes = require("./routes/libroRoutes");
const userRoutes = require("./routes/userRoutes");
const login = require("./routes/loginRoutes")

app.use("/api/login", login);
app.use("/author", autorRoutes);
app.use("/libros", libroRoutes);
app.use("/users", userRoutes);

//AGREGAR GRAPHQL
app.use("/graphql", graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true // Habilita la interfaz GraphiQL para pruebas
}));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
