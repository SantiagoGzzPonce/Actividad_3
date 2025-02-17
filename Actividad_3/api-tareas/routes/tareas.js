const express = require("express");
const { leerDatos, escribirDatos } = require("../utils/fileUtils");

const router = express.Router();
const FILE_PATH_TAREAS = "tareas.json";

// Rutas para gestionar tareas
router.route("/")
    .get(async (req, res) => {
        const tareas = await leerDatos(FILE_PATH_TAREAS);
        console.log("Obteniendo todas las tareas:", tareas);
        res.json(tareas);
    })
    .post(async (req, res) => {
        const { titulo, descripcion } = req.body;
        console.log("Datos recibidos para nueva tarea:", req.body);
        if (!titulo || !descripcion) {
            return res.status(400).json({ error: "Título y descripción son obligatorios" });
        }

        const tareas = await leerDatos(FILE_PATH_TAREAS);
        const nuevaTarea = { id: Date.now(), titulo, descripcion };
        tareas.push(nuevaTarea);

        await escribirDatos(FILE_PATH_TAREAS, tareas);
        res.status(201).json(nuevaTarea);
    });

router.route("/:id")
    .put(async (req, res) => {
        const { id } = req.params;
        const { titulo, descripcion } = req.body;
        console.log(`Actualizando tarea con id ${id}:`, req.body);

        const tareas = await leerDatos(FILE_PATH_TAREAS);
        const tareaIndex = tareas.findIndex(t => t.id == id);

        if (tareaIndex === -1) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }

        tareas[tareaIndex] = { ...tareas[tareaIndex], titulo, descripcion };
        await escribirDatos(FILE_PATH_TAREAS, tareas);
        res.json(tareas[tareaIndex]);
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        console.log(`Eliminando tarea con id ${id}`);

        const tareas = await leerDatos(FILE_PATH_TAREAS);
        const nuevasTareas = tareas.filter(t => t.id != id);

        if (tareas.length === nuevasTareas.length) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }

        await escribirDatos(FILE_PATH_TAREAS, nuevasTareas);
        res.json({ mensaje: "Tarea eliminada correctamente" });
    });

module.exports = router;
