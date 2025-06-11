/**
 * Módulo de rutas para la entidad Empleado.
 * 
 * Utilizamos el módulo `express` para crear un enrutador que define las rutas
 * del backend relacionadas con los empleados. Estas rutas serán consumidas 
 * desde el cliente (por ejemplo, Angular).
 */

// Importamos express para usar su Router
const express = require('express');
const router = express.Router();

// Importamos el controlador que contiene la lógica de negocio
const empleadoCtrl = require('../controllers/empleado.controller');

/**
 * Rutas disponibles para el recurso empleado.
 * Cada una se asocia con una función definida en el controlador correspondiente.
 */

// Obtener todos los empleados
// GET http://localhost:3000/api/empleados
router.get('/', empleadoCtrl.getEmpleados);

// Crear un nuevo empleado
// POST http://localhost:3000/api/empleados
router.post('/', empleadoCtrl.createEmpleados);

// Obtener un empleado por su ID
// GET http://localhost:3000/api/empleados/:id
router.get('/:id', empleadoCtrl.getUnicoEmpleado);

// Actualizar un empleado por su ID
// PUT http://localhost:3000/api/empleados/:id
router.put('/:id', empleadoCtrl.editarEmpleado);

// Eliminar un empleado por su ID
// DELETE http://localhost:3000/api/empleados/:id
router.delete('/:id', empleadoCtrl.eliminarEmpleado);

// Exportamos el enrutador para ser usado en index.js
module.exports = router;
