import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmpleadoService } from '../../service/empleado.service';
import { Empleado } from '../../models/empleado';

declare const M: any;

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  constructor(public empleadoService: EmpleadoService) {}

  ngOnInit(): void {}

  agregarEmpleado(form: NgForm) {
    this.empleadoService.postEmpleado(form.value).subscribe(res => {
      this.resetForm(form);
      M.toast({ html: 'Guardado satisfactoriamente' });
    });
  }

  resetForm(form: NgForm) {
    if (form) {
      form.reset();
      this.empleadoService.selectedEmpleado = new Empleado();
    }
  }
}

