/**
 * Archivo principal del servidor backend.
 * 
 * Aquí se configura y arranca el servidor Express.
 * Se definen los middlewares, la conexión a la base de datos y las rutas.
 */

// Importación de módulos necesarios
const express = require('express');         // Framework para construir el servidor web
const morgan = require('morgan');           // Middleware para mostrar las peticiones HTTP por consola
const cors = require('cors');               // Middleware para permitir solicitudes desde otro origen (CORS)
const app = express();                      // Se crea la instancia principal del servidor
const { mongoose } = require('./database'); // Se importa la conexión a la base de datos (no todo el módulo)

// -----------------------------------
// Configuraciones del servidor
// -----------------------------------

// Definición del puerto donde se ejecutará el servidor
// Si existe una variable de entorno llamada PORT, se usará esa. Si no, por defecto será 3000.
app.set('port', process.env.PORT || 3000);

// -----------------------------------
// Middlewares
// -----------------------------------

// Morgan para registrar las peticiones en consola (modo 'dev')
app.use(morgan('dev'));

// Middleware para interpretar los datos enviados en formato JSON
app.use(express.json());

// CORS permite que el frontend (por ejemplo en Angular en el puerto 4200) acceda al backend
app.use(cors({ origin: 'http://localhost:4200' }));

// -----------------------------------
// Rutas del servidor
// -----------------------------------

// Se define el prefijo '/api/empleados' y se le asocian las rutas del archivo empleado.route.js
app.use('/api/empleados', require('./routes/empleado.route'));

// -----------------------------------
// Inicio del servidor
// -----------------------------------

// Se inicia el servidor y se muestra un mensaje indicando el puerto activo
app.listen(app.get('port'), () => {
    console.log('Servidor activo en el puerto', app.get('port'));
});
