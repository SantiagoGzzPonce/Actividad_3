const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { leerDatos, escribirDatos } = require("../utils/fileUtils");

const router = express.Router();
const FILE_PATH_USUARIOS = "usuarios.json";
const SECRET_KEY = "secreto_super_seguro";

// Rutas para gestionar usuarios
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    console.log("Datos recibidos para registro:", req.body);
    if (!username || !password) {
        return res.status(400).json({ error: "Usuario y contraseña son obligatorios" });
    }

    const usuarios = await leerDatos(FILE_PATH_USUARIOS);
    const usuarioExistente = usuarios.find(u => u.username === username);

    if (usuarioExistente) {
        return res.status(400).json({ error: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = { username, password: hashedPassword };
    usuarios.push(nuevoUsuario);

    await escribirDatos(FILE_PATH_USUARIOS, usuarios);
    res.status(201).json({ mensaje: "Usuario registrado con éxito" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log("Datos recibidos para login:", req.body);

    const usuarios = await leerDatos(FILE_PATH_USUARIOS);
    const usuario = usuarios.find(u => u.username === username);

    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    console.log("Token generado:", token);
    res.json({ mensaje: "Inicio de sesión exitoso", token });
});

module.exports = router;
