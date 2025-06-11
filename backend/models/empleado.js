/**
 * Modelo de datos para Empleados.
 *
 * Este archivo define la estructura que tendrán los documentos de empleados
 * en la base de datos MongoDB, utilizando Mongoose.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Definición del esquema de empleado.
 *
 * Cada empleado tendrá los siguientes campos:
 * - name: nombre del empleado (string, requerido)
 * - position: cargo o puesto del empleado (string, requerido)
 * - office: ubicación u oficina (string, requerido)
 * - salary: salario del empleado (número, requerido)
 */
const EmpleadoSchema = new Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    office: { type: String, required: true },
    salary: { type: Number, required: true },
});

/**
 * Exportamos el modelo para poder usarlo en otros archivos (controladores, rutas).
 * El primer parámetro es el nombre de la colección ('Empleado'),
 * y el segundo es el esquema definido anteriormente.
 */
module.exports = mongoose.model('Empleado', EmpleadoSchema);
