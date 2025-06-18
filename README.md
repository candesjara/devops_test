
# 📦 nodejs_test

Proyecto backend básico con **Node.js**, **Express** y **MongoDB**, diseñado para gestionar empleados mediante una **API RESTful** con operaciones CRUD (Crear, Leer, Actualizar y Eliminar).

---

## 📁 Estructura del Proyecto

```
nodejs_test/
│
├── backend/
│   ├── controllers/
│   │   └── empleado.controller.js   # Lógica de negocio de empleados
│   ├── models/
│   │   └── empleado.js              # Esquema de Mongoose
│   ├── routes/
│   │   └── empleado.route.js        # Rutas REST del recurso empleado
│   ├── database.js                  # Conexión a MongoDB
│   └── index.js                     # Punto de entrada del servidor
│
├── package.json                     # Dependencias y scripts
└── README.md                        # Documentación del proyecto
```

---

## 🚀 Instalación y Ejecución

1. Clona el repositorio:

```bash
git clone https://github.com/candesjara/nodejs_test.git
cd nodejs_test
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

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Morgan](https://www.npmjs.com/package/morgan)
- [CORS](https://www.npmjs.com/package/cors)
- [Nodemon](https://www.npmjs.com/package/nodemon)

---
