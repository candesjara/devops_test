// Importamos utilidades del paquete de testing de Angular.
// TestBed nos permite crear un "módulo de pruebas" donde declaramos componentes,
// importamos módulos y registramos providers como si fuera un NgModule real.
import { TestBed } from '@angular/core/testing';

// Importamos el componente raíz de la app que vamos a probar.
import { AppComponent } from './app.component';

// Importamos NO_ERRORS_SCHEMA desde @angular/core.
// Este schema le indica al compilador de Angular que ignore elementos y atributos
// desconocidos en las plantillas. Es muy útil en pruebas cuando el componente
// bajo prueba (AppComponent) utiliza componentes hijos (p. ej. <app-empleados>)
// que no estamos declarando en el TestBed para mantener la prueba aislada y simple.
import { NO_ERRORS_SCHEMA } from '@angular/core';

// Bloque de suite de pruebas para AppComponent.
// 'describe' agrupa uno o más tests (its) relacionados con el mismo sujeto.
describe('AppComponent', () => {

  // beforeEach se ejecuta ANTES de cada 'it'.
  // Lo marcamos como async/await porque TestBed.compileComponents() devuelve una Promise:
  // compila las plantillas y hojas de estilo de los componentes declarados.
  beforeEach(async () => {
    // Configuramos un módulo de pruebas temporal con TestBed.
    await TestBed.configureTestingModule({
      // 'declarations' contiene los componentes/pipes/directivas que vamos a usar en la prueba.
      // Aquí solo declaramos AppComponent para mantener la prueba enfocada y rápida.
      declarations: [AppComponent],

      // 'schemas' nos permite decirle al compilador que ignore elementos/atributos desconocidos.
      // Esto evita errores como "is not a known element" si AppComponent renderiza
      // componentes hijos que no hemos declarado (p. ej. <app-empleados>).
      schemas: [NO_ERRORS_SCHEMA]
    })
    // Compila las plantillas (HTML) y estilos (CSS) de las 'declarations'.
    // Es necesario antes de crear instancias de los componentes en tests de compilación.
    .compileComponents();
  });

  // Caso de prueba: verificar que el componente puede crearse.
  it('should create the app', () => {
    // Creamos un "fixture" para AppComponent.
    // El fixture es un contenedor de utilidades que envuelve al componente,
    // su template, el detector de cambios y acceso al DOM renderizado.
    const fixture = TestBed.createComponent(AppComponent);

    // Obtenemos la instancia de clase del componente a partir del fixture.
    // Aquí podemos acceder a propiedades y métodos de AppComponent.
    const app = fixture.componentInstance;

    // Aserción: esperamos que la instancia exista (sea "truthy").
    // Si la creación fallara (por dependencias ausentes, errores de compilación, etc.),
    // esta expectativa no se cumpliría.
    expect(app).toBeTruthy();

    // Nota: No llamamos a fixture.detectChanges() porque en este test
    // solo verificamos la creación de la instancia, no la renderización del template.
  });
});

