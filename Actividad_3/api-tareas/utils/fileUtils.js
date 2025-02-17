const fs = require("fs").promises;

// Función para leer datos desde un archivo JSON
const leerDatos = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        console.log(`Datos leídos desde ${filePath}:`, data);
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error leyendo datos desde ${filePath}:`, error);
        return [];
    }
};

// Función para escribir datos en un archivo JSON
const escribirDatos = async (filePath, datos) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(datos, null, 2));
        console.log(`Datos escritos en ${filePath}:`, datos);
    } catch (error) {
        console.error(`Error escribiendo datos en ${filePath}:`, error);
    } 
};

module.exports = { leerDatos, escribirDatos };
