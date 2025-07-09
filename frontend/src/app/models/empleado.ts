// Esta clase representa el modelo de datos de un Empleado.
// Define las propiedades que tendrá cada objeto de tipo Empleado y su inicialización por defecto.
// Este modelo se usará para manejar la información de empleados en formularios, listas y peticiones HTTP.

export class Empleado {

  // Constructor que inicializa las propiedades del objeto Empleado con valores por defecto.
  // Si no se pasan parámetros al crear una instancia, se usarán los valores establecidos aquí.
  constructor(_id = "", name = "", position = "", office = "", salary = 0) {
    this._id = _id;         // ID único del empleado (MongoDB utiliza "_id" como convención)
    this.name = name;       // Nombre completo del empleado
    this.position = position; // Cargo o título del empleado dentro de la empresa
    this.office = office;   // Oficina o sede donde está asignado el empleado
    this.salary = salary;   // Salario del empleado (valor numérico)
  }

  // Propiedades del modelo con sus tipos explícitos
  _id: string;       // Identificador único del empleado (en MongoDB se usa "_id")
  name: string;      // Nombre del empleado
  position: string;  // Puesto o rol que ocupa el empleado
  office: string;    // Oficina donde labora
  salary: number;    // Salario que devenga el empleado
}
