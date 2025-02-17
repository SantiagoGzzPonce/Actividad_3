const express = require("express");
const cors = require('cors');
const { verificarToken } = require("./middleware/auth");
const tareaRoutes = require("./routes/tareas");
const usuarioRoutes = require("./routes/usuarios");

const app = express();
app.use(express.json());

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:3001' // Permite peticiones desde el puerto de React
}));

// Rutas
app.use("/tareas", verificarToken, tareaRoutes);
app.use("/usuarios", usuarioRoutes);

// Ruta raíz para mostrar mensaje de bienvenida
app.get("/", (req, res) => {
    res.send("Bienvenido a la API de tareas. Usa /tareas para gestionar las tareas.");
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error("Error:", err.stack);  // Log de error para debug
    res.status(500).json({ mensaje: 'Algo salió mal, por favor inténtalo más tarde' });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
