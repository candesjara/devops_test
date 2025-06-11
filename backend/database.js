/**
 * Archivo de conexión a la base de datos MongoDB usando Mongoose.
 * 
 * Este módulo establece la conexión entre la aplicación backend y 
 * la base de datos local llamada "empleados".
 */

const mongoose = require('mongoose'); // Importamos el ODM Mongoose para trabajar con MongoDB

// URI de conexión a la base de datos (en este caso, una base local llamada 'empleados')
const URI = 'mongodb://localhost:27017/empleados';

// Conexión a MongoDB
mongoose.connect(URI)
    .then(db => console.log('DB is connected'))        // Mensaje en consola si la conexión es exitosa
    .catch(err => console.error(err));                 // En caso de error, se muestra en consola

// Exportamos mongoose para usar la conexión en otros módulos
module.exports = mongoose;
