const jwt = require("jsonwebtoken");
const SECRET_KEY = "secreto_super_seguro";

// Middleware de autenticación
const verificarToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token recibido:", token);
    if (!token) {
        return res.status(401).json({ error: "Acceso denegado. Token requerido." });
    }

    try {
        const usuarioVerificado = jwt.verify(token, SECRET_KEY);
        console.log("Usuario verificado:", usuarioVerificado);
        req.usuario = usuarioVerificado;
        next();
    } catch (error) {
        console.error("Error verificando token:", error);
        res.status(401).json({ error: "Token inválido o expirado" });
    }
};

module.exports = { verificarToken };
