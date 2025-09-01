// backend/tests/empleado.controller.test.js
const empleadoCtrl = require('../controllers/empleado.controller');
const Empleado = require('../models/empleado');

// Mock del modelo de Mongoose
jest.mock('../models/empleado');

describe('Pruebas unitarias - empleado.controller', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  test('getEmpleados debe devolver todos los empleados', async () => {
    const empleadosMock = [{ name: 'Carlos' }, { name: 'Ana' }];
    Empleado.find.mockResolvedValue(empleadosMock);

    await empleadoCtrl.getEmpleados(req, res);

    expect(Empleado.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(empleadosMock);
  });

  test('createEmpleados debe crear un empleado y devolver status 201', async () => {
    const empleadoMock = { name: 'Pedro', save: jest.fn().mockResolvedValue(true) };
    Empleado.mockImplementation(() => empleadoMock);

    req.body = { name: 'Pedro', position: 'Dev', office: 'Bogotá', salary: 5000 };

    await empleadoCtrl.createEmpleados(req, res);

    expect(empleadoMock.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(empleadoMock);
  });

  test('getUnicoEmpleado debe devolver un empleado por ID', async () => {
    const empleadoMock = { name: 'Laura' };
    Empleado.findById.mockResolvedValue(empleadoMock);

    req.params.id = '123';

    await empleadoCtrl.getUnicoEmpleado(req, res);

    expect(Empleado.findById).toHaveBeenCalledWith('123');
    expect(res.json).toHaveBeenCalledWith(empleadoMock);
  });

  test('editarEmpleado debe actualizar un empleado', async () => {
    Empleado.findByIdAndUpdate.mockResolvedValue({});

    req.params.id = '456';
    req.body = { name: 'Mario', position: 'QA', office: 'Medellín', salary: 4000 };

    await empleadoCtrl.editarEmpleado(req, res);

    expect(Empleado.findByIdAndUpdate).toHaveBeenCalledWith(
      '456',
      { $set: req.body },
      { new: true }
    );
    expect(res.json).toHaveBeenCalledWith({ status: 'Empleado Actualizado' });
  });

  test('eliminarEmpleado debe borrar un empleado por ID', async () => {
    Empleado.findByIdAndDelete.mockResolvedValue({});

    req.params.id = '789';

    await empleadoCtrl.eliminarEmpleado(req, res);

    expect(Empleado.findByIdAndDelete).toHaveBeenCalledWith('789');
    expect(res.json).toHaveBeenCalledWith({ status: 'Empleado Eliminado' });
  });

  // ----- Tests adicionales propuestos (mantener dentro del mismo describe) -----

  test('createEmpleados elimina _id vacío antes de guardar', async () => {
    const empleadoMock = { save: jest.fn().mockResolvedValue(true) };

    // Interceptamos la implementación del constructor para revisar los datos recibidos
    Empleado.mockImplementation((data) => {
      // El controlador debe borrar _id cuando es cadena vacía
      expect(data._id).toBeUndefined();
      return empleadoMock;
    });

    req.body = { _id: '', name: 'Lina', position: 'Dev', office: 'Bogotá', salary: 6000 };

    await empleadoCtrl.createEmpleados(req, res);

    expect(empleadoMock.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(empleadoMock);
  });

  test('createEmpleados maneja error interno con 500', async () => {
    const empleadoMock = { save: jest.fn().mockRejectedValue(new Error('Falla DB')) };
    Empleado.mockImplementation(() => empleadoMock);

    req.body = { name: 'Pepe', position: 'QA', office: 'Medellín', salary: 3000 };

    await empleadoCtrl.createEmpleados(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Falla DB' }));
  });

  test('getUnicoEmpleado retorna null si no existe', async () => {
    Empleado.findById.mockResolvedValue(null);
    req.params.id = 'no-existe';

    await empleadoCtrl.getUnicoEmpleado(req, res);

    expect(Empleado.findById).toHaveBeenCalledWith('no-existe');
    expect(res.json).toHaveBeenCalledWith(null);
  });

  test('editarEmpleado con campos parciales envía solo esos campos', async () => {
    Empleado.findByIdAndUpdate.mockResolvedValue({});
    req.params.id = 'abc123';
    req.body = { name: 'Nuevo Nombre' }; // parcial

    await empleadoCtrl.editarEmpleado(req, res);

    // Observa: la implementación actual construye un objeto con todas las claves (algunas undefined)
    expect(Empleado.findByIdAndUpdate).toHaveBeenCalledWith(
      'abc123',
      { $set: { name: 'Nuevo Nombre', position: undefined, office: undefined, salary: undefined } },
      { new: true }
    );
    expect(res.json).toHaveBeenCalledWith({ status: 'Empleado Actualizado' });
  });

  test('getEmpleados devuelve arreglo vacío sin fallar', async () => {
    Empleado.find.mockResolvedValue([]);
    await empleadoCtrl.getEmpleados(req, res);
    expect(res.json).toHaveBeenCalledWith([]);
  });

});
