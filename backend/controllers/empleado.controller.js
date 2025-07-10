/**
 * Controlador de empleados
 *
 * Este módulo define las funciones (métodos) que permiten gestionar empleados
 * mediante operaciones CRUD (Crear, Leer, Actualizar, Eliminar).
 * 
 * Primero se importa el modelo de Mongoose para acceder a la base de datos.
 */

const Empleado = require('../models/empleado'); // Importamos el modelo
const empleadoCtrl = {}; // Creamos el objeto controlador

/**
 * Obtener todos los empleados.
 * Método: GET
 * Ruta: /api/empleados
 */
empleadoCtrl.getEmpleados = async (req, res) => {
    const empleados = await Empleado.find(); // Busca todos los registros
    res.json(empleados); // Devuelve el resultado como JSON
};

/**
 * Crear un nuevo empleado.
 * Método: POST
 * Ruta: /api/empleados
 */
empleadoCtrl.createEmpleados = async (req, res) => {
    try {
    // ⚠️ Eliminar el _id si es una cadena vacía
    if (req.body._id === '') {
      delete req.body._id;
    }

    const empleado = new Empleado(req.body);
    await empleado.save();
    res.status(201).json(empleado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Obtener un único empleado por su ID.
 * Método: GET
 * Ruta: /api/empleados/:id
 */
empleadoCtrl.getUnicoEmpleado = async (req, res) => {
    const empleadoUnico = await Empleado.findById(req.params.id); // Busca por ID
    res.json(empleadoUnico); // Devuelve el empleado encontrado
};

/**
 * Actualizar un empleado por su ID.
 * Método: PUT
 * Ruta: /api/empleados/:id
 */
empleadoCtrl.editarEmpleado = async (req, res) => {
    const { id } = req.params;
    const empleadoEditado = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };
    await Empleado.findByIdAndUpdate(id, { $set: empleadoEditado }, { new: true }); // Actualiza el documento
    res.json({ status: 'Empleado Actualizado' });
};

/**
 * Eliminar un empleado por su ID.
 * Método: DELETE
 * Ruta: /api/empleados/:id
 */
empleadoCtrl.eliminarEmpleado = async (req, res) => {
    await Empleado.findByIdAndDelete(req.params.id); // Elimina el documento
    res.json({ status: 'Empleado Eliminado' });
};

// Exportamos el controlador para ser usado en las rutas
module.exports = empleadoCtrl;
