// Este componente maneja la lógica de la interfaz de usuario relacionada con los empleados.
// Permite agregar empleados mediante un formulario y muestra mensajes de confirmación usando Materialize CSS.

// Importaciones necesarias para el componente de empleados

import { Component, OnInit } from '@angular/core';           // Decorador y ciclo de vida para componentes Angular
import { NgForm } from '@angular/forms';                     // Permite trabajar con formularios template-driven
import { EmpleadoService } from '../../service/empleado.service'; // Servicio que gestiona las operaciones sobre empleados
import { Empleado } from '../../models/empleado';            // Modelo de datos de empleado

// Declaración de la librería externa Materialize CSS para mostrar notificaciones (toasts)
declare const M: any;

// Decorador que define los metadatos del componente
@Component({
  selector: 'app-empleados',                                 // Selector para usar este componente en otras vistas
  templateUrl: './empleados.component.html',                 // Ruta del archivo de plantilla HTML asociado
  styleUrls: ['./empleados.component.css']                   // Ruta del archivo de estilos CSS del componente
})
export class EmpleadosComponent implements OnInit {

  // Inyección del servicio de empleados como propiedad pública para que se pueda usar en la plantilla HTML
  constructor(public empleadoService: EmpleadoService) {}

  // Método del ciclo de vida que se ejecuta cuando se inicializa el componente
  // Se usa para cargar la lista inicial de empleados desde el backend
  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  // Método que se ejecuta al enviar el formulario
  // Si el empleado tiene un _id, se actualiza. Si no, se crea uno nuevo.
  agregarEmpleado(form: NgForm) {
    if (form.value._id) {
      // Actualiza un empleado existente
      this.empleadoService.putEmpleado(form.value).subscribe(res => {
        this.resetForm(form);                                 // Limpia el formulario
        M.toast({ html: 'Actualizado satisfactoriamente' });  // Notificación de éxito
        this.obtenerEmpleados();                              // Recarga la lista de empleados
      });
    } else {
      // Crea un nuevo empleado
      this.empleadoService.postEmpleado(form.value).subscribe(res => {
        this.resetForm(form);                                 // Limpia el formulario
        M.toast({ html: 'Guardado satisfactoriamente' });     // Notificación de éxito
        this.obtenerEmpleados();                              // Recarga la lista de empleados
      });
    }
  }

  // Método para limpiar el formulario y reiniciar el modelo seleccionado
  resetForm(form: NgForm) {
    if (form) {
      form.reset();                                           // Limpia los campos del formulario
      this.empleadoService.selectedEmpleado = new Empleado(); // Reinicia el objeto seleccionado
    }
  }

  // Método para cargar todos los empleados desde el backend y guardarlos en el arreglo del servicio
  obtenerEmpleados() {
    this.empleadoService.getEmpleados().subscribe(res => {
      this.empleadoService.empleados = res;                  // Asigna la respuesta al arreglo del servicio
    });
  }

  // Método para cargar un empleado en el formulario cuando se desea editar
  editarEmpleado(empleado: Empleado) {
    // Se crea una copia del objeto para evitar modificar la referencia original directamente
    this.empleadoService.selectedEmpleado = { ...empleado };
  }

  // Método para eliminar un empleado por su ID
  eliminarEmpleado(_id: string) {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.empleadoService.deleteEmpleado(_id).subscribe(res => {
        M.toast({ html: 'Empleado eliminado' });              // Notificación de éxito
        this.obtenerEmpleados();                              // Recarga la lista actualizada
      });
    }
  }
}



