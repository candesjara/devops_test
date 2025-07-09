// Este servicio se encarga de gestionar la comunicación entre el frontend Angular y el backend (API REST)
// para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los empleados.

import { Injectable } from '@angular/core';               // Permite que Angular reconozca esta clase como un servicio inyectable
import { HttpClient } from '@angular/common/http';        // Servicio de Angular para hacer peticiones HTTP
import { Empleado } from '../models/empleado';            // Importa el modelo de datos Empleado
import { Observable } from 'rxjs';                        // Permite trabajar con flujos de datos asincrónicos

// Decorador que indica que este servicio estará disponible en toda la aplicación (a nivel raíz)
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  
  // Propiedad que representa el empleado actualmente seleccionado (por ejemplo, para editar en formularios)
  selectedEmpleado: Empleado = new Empleado();

  // Arreglo que contendrá la lista de empleados recibida desde el backend
  empleados: Empleado[] = [];

  // URL base del API backend. Aquí se hacen las peticiones HTTP.
  readonly URL_API = 'http://localhost:3000/api/empleados';

  // Constructor que inyecta el servicio HttpClient para hacer las peticiones HTTP
  constructor(private http: HttpClient) {}

  // Método que obtiene todos los empleados desde el backend
  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.URL_API);
  }

  // Método que envía un nuevo empleado al backend para ser guardado (operación CREATE)
  postEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.URL_API, empleado);
  }

  // Método que actualiza los datos de un empleado existente (operación UPDATE)
  putEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.URL_API}/${empleado._id}`, empleado);
  }

  // Método que elimina un empleado del backend mediante su ID (operación DELETE)
  deleteEmpleado(_id: string): Observable<any> {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}

