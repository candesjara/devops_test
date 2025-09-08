// Importamos TestBed para configurar el entorno de pruebas de Angular.
import { TestBed } from '@angular/core/testing';

// Importamos módulos especiales para simular peticiones HTTP en pruebas.
// - HttpClientTestingModule: reemplaza a HttpClient real con una versión de prueba.
// - HttpTestingController: nos permite "espiar" y controlar las solicitudes HTTP que se hagan.
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Importamos el servicio que vamos a probar.
import { EmpleadoService } from './empleado.service';

// Importamos la interfaz/clase que define el modelo de empleado.
import { Empleado } from '../models/empleado';

// Grupo de pruebas para el servicio.
describe('EmpleadoService', () => {
  // Declaramos variables que usaremos en las pruebas.
  let service: EmpleadoService;            // Instancia del servicio bajo prueba.
  let httpMock: HttpTestingController;     // Controlador para las peticiones HTTP simuladas.

  // beforeEach se ejecuta ANTES de cada test.
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Importamos el módulo HTTP de pruebas en lugar del HttpClient real.
      imports: [HttpClientTestingModule],

      // Registramos el servicio como provider para que pueda inyectarse.
      providers: [EmpleadoService]
    });

    // Obtenemos la instancia del servicio desde el TestBed.
    service = TestBed.inject(EmpleadoService);

    // Obtenemos la instancia del controlador HTTP de pruebas.
    httpMock = TestBed.inject(HttpTestingController);
  });

  // afterEach se ejecuta DESPUÉS de cada test.
  afterEach(() => {
    // Verifica que no haya solicitudes HTTP pendientes sin resolver.
    // Esto asegura que todas las peticiones hayan sido "flusheadas" correctamente.
    httpMock.verify();
  });

  // Caso de prueba: obtener lista de empleados (GET).
  it('debería obtener la lista de empleados', () => {
    // Definimos un mock de respuesta que simula lo que devuelve la API.
    const mockEmpleados: Empleado[] = [
      { _id: '1', name: 'Ana', office: 'Dev', position: 'HQ', salary: 1000 }
    ];

    // Llamamos al método del servicio y comprobamos el resultado esperado.
    service.getEmpleados().subscribe(empleados => {
      expect(empleados.length).toBe(1);               // esperamos 1 empleado
      expect(empleados).toEqual(mockEmpleados);       // y que coincida con el mock
    });

    // Interceptamos la petición HTTP esperada.
    const req = httpMock.expectOne(service.URL_API);

    // Validamos que la petición haya sido un GET.
    expect(req.request.method).toBe('GET');

    // Respondemos con el mock como si fuera la API real.
    req.flush(mockEmpleados);
  });

  // Caso de prueba: crear empleado (POST).
  it('debería crear un empleado', () => {
    const newEmpleado: Empleado = {
      _id: '2', name: 'Luis', office: 'QA', position: 'Remote', salary: 800
    };

    service.postEmpleado(newEmpleado).subscribe(res => {
      expect(res).toEqual(newEmpleado);   // esperamos recibir el mismo empleado creado
    });

    // Interceptamos la petición HTTP POST a la URL base.
    const req = httpMock.expectOne(service.URL_API);
    expect(req.request.method).toBe('POST');

    // Respondemos con el mock del empleado creado.
    req.flush(newEmpleado);
  });

  // Caso de prueba: actualizar empleado (PUT).
  it('debería actualizar un empleado', () => {
    const updatedEmpleado: Empleado = {
      _id: '3', name: 'Marta', office: 'PM', position: 'HQ', salary: 1500
    };

    service.putEmpleado(updatedEmpleado).subscribe(res => {
      expect(res).toEqual(updatedEmpleado);   // esperamos recibir el mismo empleado actualizado
    });

    // Interceptamos la petición HTTP PUT a la URL con el id del empleado.
    const req = httpMock.expectOne(`${service.URL_API}/3`);
    expect(req.request.method).toBe('PUT');

    // Respondemos con el mock del empleado actualizado.
    req.flush(updatedEmpleado);
  });

  // Caso de prueba: eliminar empleado (DELETE).
  it('debería eliminar un empleado', () => {
    // Llamamos al método de borrar y esperamos que devuelva algo truthy.
    service.deleteEmpleado('4').subscribe(res => {
      expect(res).toBeTruthy();
    });

    // Interceptamos la petición HTTP DELETE.
    const req = httpMock.expectOne(`${service.URL_API}/4`);
    expect(req.request.method).toBe('DELETE');

    // Respondemos como si el backend confirmara la eliminación.
    req.flush({ success: true });
  });
});
