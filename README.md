# 📦 nodejs_test

Proyecto fullstack básico con **Node.js**, **Express**, **MongoDB** y **Angular 13**, diseñado para gestionar empleados mediante una **API RESTful** con operaciones CRUD (Crear, Leer, Actualizar y Eliminar).

---

## 📁 Estructura del Proyecto

```
nodejs_test/
│
├── backend/                        # Servidor con Node.js + Express + MongoDB
│   ├── controllers/
│   │   └── empleado.controller.js   # Lógica de negocio de empleados
│   ├── models/
│   │   └── empleado.js              # Esquema de Mongoose
│   ├── routes/
│   │   └── empleado.route.js        # Rutas REST del recurso empleado
│   ├── tests/
│   │   └── empleado.controller.test.js # Pruebas unitarias con Jest
│   ├── database.js                  # Conexión a MongoDB
│   └── index.js                     # Punto de entrada del servidor
│
├── frontend/                        # Aplicación Angular 13
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/empleados/
│   │   │   │   ├── empleados.component.ts
│   │   │   │   ├── empleados.component.html
│   │   │   │   ├── empleados.component.css
│   │   │   │   └── empleados.component.spec.ts
│   │   │   ├── models/
│   │   │   │   ├── empleado.ts
│   │   │   │   └── empleado.spec.ts
│   │   │   ├── service/
│   │   │   │   ├── empleado.service.ts
│   │   │   │   └── empleado.service.spec.ts
│   │   │   ├── app.component.ts
│   │   │   ├── app.component.html
│   │   │   ├── app.component.css
│   │   │   └── app.module.ts
│   │   ├── assets/
│   │   ├── environments/
│   │   ├── index.html
│   │   └── styles.css
│   └── angular.json
│
├── package.json                     # Dependencias y scripts (backend)
└── README.md                        # Documentación del proyecto
```

---

## 🚀 Instalación y Ejecución

### 🔹 Backend (Node.js + Express + MongoDB)

1. Clona el repositorio:

```bash
git clone https://github.com/candesjara/nodejs_test.git
cd nodejs_test/backend
```

2. Instala las dependencias:

```bash
npm install
```

3. Verifica que tu MongoDB esté corriendo en `mongodb://localhost:27017`.

4. Ejecuta el servidor:

```bash
npm run dev
```

5. Ejecuta las pruebas unitarias (opcional):

```bash
npm test
```

---

### 🔹 Frontend (Angular 13)

1. Ve a la carpeta del frontend:

```bash
cd ../frontend
```

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta la aplicación Angular:

```bash
ng serve -o
```

Esto abrirá la aplicación en `http://localhost:4200`.

---

## 📡 Endpoints de la API

| Método | Ruta                  | Acción                          |
|--------|-----------------------|----------------------------------|
| GET    | `/api/empleados`      | Obtener todos los empleados      |
| POST   | `/api/empleados`      | Crear un nuevo empleado          |
| GET    | `/api/empleados/:id`  | Obtener un empleado por ID       |
| PUT    | `/api/empleados/:id`  | Actualizar un empleado por ID    |
| DELETE | `/api/empleados/:id`  | Eliminar un empleado por ID      |

---

## 🧰 Tecnologías utilizadas

### Backend:
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Morgan](https://www.npmjs.com/package/morgan)
- [CORS](https://www.npmjs.com/package/cors)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Jest](https://jestjs.io/)

### Frontend:
- [Angular 13](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)
- [Bootstrap](https://getbootstrap.com/) (opcional para estilos)

---

## 🧪 Pruebas unitarias

El proyecto incluye pruebas unitarias implementadas con **Jest** para validar la lógica del controlador de empleados.

### ▶️ Ejecutar pruebas

Para correr los tests, utiliza el comando:

```bash
npm test
📋 Cobertura de las pruebas
```
Actualmente se validan los siguientes casos:

getEmpleados → Devuelve todos los empleados.

createEmpleado → Crea un nuevo empleado y devuelve status 201.

getUnicoEmpleado → Devuelve un empleado por su ID.

editarEmpleado → Actualiza un empleado existente.

eliminarEmpleado → Borra un empleado por su ID.

Al ejecutar npm test, deberías ver que todas las pruebas pasan correctamente ✅.