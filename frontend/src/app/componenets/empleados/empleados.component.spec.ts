// Importamos dependencias necesarias para pruebas en Angular.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';

// Importamos el componente que vamos a probar.
import { EmpleadosComponent } from './empleados.component';

// Importamos el servicio que maneja la lógica de empleados (será simulado en los tests).
import { EmpleadoService } from '../../service/empleado.service';

// Importamos el modelo de empleado.
import { Empleado } from '../../models/empleado';

// ----------------------
// MOCK DE MATERIALIZE CSS
// ----------------------
// Angular no sabe cómo manejar directamente librerías externas como Materialize,
// así que "simulamos" su objeto `M` y, en especial, el método `toast` que usamos en el componente.
declare const M: any;
(window as any).M = { toast: jasmine.createSpy('toast') };

// ----------------------
// INICIO DEL BLOQUE DE PRUEBAS
// ----------------------
describe('EmpleadosComponent', () => {
  let component: EmpleadosComponent;                 // Instancia del componente
  let fixture: ComponentFixture<EmpleadosComponent>; // Fixture = entorno de pruebas del componente
  let empleadoServiceSpy: jasmine.SpyObj<EmpleadoService>; // Espía del servicio

  // beforeEach se ejecuta antes de cada prueba individual.
  beforeEach(async () => {
    // Creamos un espía (mock) del servicio con los métodos que usa el componente.
    const spy = jasmine.createSpyObj('EmpleadoService', [
      'getEmpleados',
      'postEmpleado',
      'putEmpleado',
      'deleteEmpleado'
    ]);

    // Configuramos el módulo de pruebas de Angular.
    await TestBed.configureTestingModule({
      imports: [FormsModule], // Necesario porque el componente usa formularios template-driven
      declarations: [EmpleadosComponent], // Declaramos el componente bajo prueba
      providers: [{ provide: EmpleadoService, useValue: spy }] // Inyectamos el servicio espía
    }).compileComponents();

    // Creamos el componente dentro del fixture.
    fixture = TestBed.createComponent(EmpleadosComponent);
    component = fixture.componentInstance;

    // Obtenemos la instancia del servicio espía desde el TestBed.
    empleadoServiceSpy = TestBed.inject(EmpleadoService) as jasmine.SpyObj<EmpleadoService>;
  });

  // ----------------------
  // CASOS DE PRUEBA
  // ----------------------

  // 1. Verificamos que el componente se cree correctamente.
  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  // 2. Verificamos que al inicializar el componente se llamen los empleados.
  it('debería llamar a obtenerEmpleados en ngOnInit', () => {
    empleadoServiceSpy.getEmpleados.and.returnValue(of([])); // simulamos respuesta vacía
    component.ngOnInit(); // ejecutamos ciclo de vida
    expect(empleadoServiceSpy.getEmpleados).toHaveBeenCalled(); // comprobamos llamada
  });

  // 3. Probar que se agrega un nuevo empleado si no tiene `_id`.
  it('debería agregar un nuevo empleado si no tiene _id', () => {
    // Simulamos un formulario con un empleado nuevo (sin id).
    const mockForm = { value: { name: 'Juan' }, reset: jasmine.createSpy('reset') } as unknown as NgForm;

    // Simulamos llamadas del servicio.
    empleadoServiceSpy.postEmpleado.and.returnValue(of({} as Empleado));
    empleadoServiceSpy.getEmpleados.and.returnValue(of([]));

    component.agregarEmpleado(mockForm); // ejecutamos método

    // Comprobamos que se haya llamado el método correcto.
    expect(empleadoServiceSpy.postEmpleado).toHaveBeenCalled();
    // Comprobamos que el toast de Materialize haya sido mostrado.
    expect(M.toast).toHaveBeenCalledWith({ html: 'Guardado satisfactoriamente' });
  });

  // 4. Probar que se actualiza un empleado si tiene `_id`.
  it('debería actualizar un empleado si tiene _id', () => {
    const mockForm = { value: { _id: '123', name: 'Pedro' }, reset: jasmine.createSpy('reset') } as unknown as NgForm;

    empleadoServiceSpy.putEmpleado.and.returnValue(of({} as Empleado));
    empleadoServiceSpy.getEmpleados.and.returnValue(of([]));

    component.agregarEmpleado(mockForm);

    expect(empleadoServiceSpy.putEmpleado).toHaveBeenCalled();
    expect(M.toast).toHaveBeenCalledWith({ html: 'Actualizado satisfactoriamente' });
  });

  // 5. Probar el reseteo del formulario y del empleado seleccionado.
  it('debería resetear el formulario y el empleado seleccionado', () => {
    const mockForm = { reset: jasmine.createSpy('reset') } as unknown as NgForm;

    component.resetForm(mockForm);

    // Verificamos que el formulario se reseteó.
    expect(mockForm.reset).toHaveBeenCalled();
    // Verificamos que el empleado seleccionado se reinició con un objeto vacío.
    expect(component.empleadoService.selectedEmpleado).toEqual(new Empleado());
  });

  // 6. Probar eliminación de empleado.
  it('debería eliminar un empleado', () => {
    // Simulamos confirmación de usuario en el navegador.
    spyOn(window, 'confirm').and.returnValue(true);

    // Simulamos que la API responde exitosamente.
    empleadoServiceSpy.deleteEmpleado.and.returnValue(of({}));
    empleadoServiceSpy.getEmpleados.and.returnValue(of([]));

    component.eliminarEmpleado('123');

    // Verificamos que el servicio fue llamado con el id correcto.
    expect(empleadoServiceSpy.deleteEmpleado).toHaveBeenCalledWith('123');
    // Verificamos que se mostró el toast de confirmación.
    expect(M.toast).toHaveBeenCalledWith({ html: 'Empleado eliminado' });
  });
});
