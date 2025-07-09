// Este archivo define el módulo principal de la aplicación Angular.
// Aquí se registran los componentes, módulos necesarios, y el componente de arranque de la app.

import { NgModule } from '@angular/core';            // Decorador para definir módulos en Angular
import { BrowserModule } from '@angular/platform-browser';  // Necesario para que la app funcione en un navegador web
import { FormsModule } from '@angular/forms';        // Permite trabajar con formularios y usar ngModel
import { HttpClientModule } from '@angular/common/http'; // Permite hacer peticiones HTTP a servidores/APIs

// Importación de componentes que hacen parte de este módulo
import { AppComponent } from './app.component';      // Componente raíz de la aplicación
import { EmpleadosComponent } from './componenets/empleados/empleados.component'; // Componente para gestión de empleados

// Decorador que define un módulo Angular
@NgModule({
  // Declaración de los componentes que pertenecen a este módulo
  declarations: [
    AppComponent,         // Componente principal que arranca la aplicación
    EmpleadosComponent    // Componente personalizado que gestiona empleados
  ],
  // Importación de módulos externos necesarios para el funcionamiento de la app
  imports: [
    BrowserModule,        // Módulo requerido para aplicaciones web
    FormsModule,          // Módulo que permite el uso de formularios reactivos y ngModel
    HttpClientModule      // Módulo para consumir servicios HTTP (REST API)
  ],
  // Servicios disponibles para toda la aplicación (vacío si no hay servicios globales)
  providers: [],
  // Indica el componente que se debe cargar al iniciar la aplicación
  bootstrap: [AppComponent]
})
// Exporta la clase AppModule, que representa el módulo raíz de la aplicación Angular
export class AppModule { }
