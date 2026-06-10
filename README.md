# CanchApp

Sistema de reserva de turnos para canchas de pádel y pelota paleta.

- **Backend:** Node.js + Express + MySQL (XAMPP / phpMyAdmin)
- **Frontend:** React + Vite

---

## Requisitos

- Node.js
- MySQL (por ejemplo XAMPP)

---

## Estructura del proyecto

```
Canchapp/
├── backend/
│   ├── database/        ← archivo .sql para importar en phpMyAdmin
│   ├── src/
│   │   ├── controllers/ ← lógica de cada endpoint
│   │   ├── routes/      ← definición de las rutas
│   │   └── db.js        ← conexión a MySQL
│   ├── .env             ← variables de entorno (no se sube a GitHub)
│   ├── index.js         ← entrada principal del servidor
│   └── package.json
└── frontend/            ← próximamente
```

---

## Configuración del backend

1. Clonar el repositorio:

```bash
git clone https://github.com/Macahuarte09/Canchapp.git
cd backend
npm install
```

2. Crear archivo `.env` dentro de la carpeta `backend`:

```
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=canchapp
```

3. Importar la base de datos:
   - Abrir phpMyAdmin.
   - Crear una base de datos llamada `canchapp`.
   - Ir a **Importar** y cargar el archivo `.sql` de la carpeta `database`.

4. Correr el servidor:

```bash
node index.js
```

---

## Endpoints disponibles

### Canchas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/canchas` | Trae todas las canchas |
| POST | `/api/canchas` | Crea una cancha nueva |
| PUT | `/api/canchas/:id` | Actualiza una cancha |
| DELETE | `/api/canchas/:id` | Elimina una cancha |
