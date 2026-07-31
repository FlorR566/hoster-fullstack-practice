# Hoster Fullstack

Plataforma fullstack de gestión hotelera (PMS): reservas, huéspedes, habitaciones, pagos, mantenimiento, incidentes y reportes potenciados con IA. Proyecto desarrollado en equipo durante un programa de formación, donde participé como desarrolladora frontend.

> Este repositorio es un fork personal del proyecto original ([IgrowkerTraining/i006-hoster-fullstack](https://github.com/IgrowkerTraining/i006-hoster-fullstack)), donde terminé de pulir algunos detalles pendientes tras la finalización del entrenamiento.

## Descripción del Proyecto

Hoster es un sistema de gestión operativa para hoteles que centraliza:

- **Reservas**: alta, edición, check-in/check-out, búsqueda y disponibilidad de unidades
- **Huéspedes y pagos**: datos del huésped, métodos de pago, monedas, orígenes de reserva
- **Habitaciones / Unidades**: vista general de ocupación, servicios adicionales por unidad
- **Mantenimiento e incidentes**: reporte y seguimiento de incidentes y tareas de mantenimiento
- **Dashboard**: gráficos de ocupación, actividad diaria, últimas actividades y acciones rápidas
- **Reportes con IA**: un servicio independiente que genera reportes y chat asistido usando un LLM

## Arquitectura del Proyecto

Proyecto compuesto por **tres servicios independientes**, cada uno con su propio `Dockerfile`, orquestados desde el `docker-compose.yml` de la raíz:

```
hoster-fullstack/
├── apps/
│   ├── backend/                # API principal - Node.js + TypeScript + Express
│   │   └── src/
│   │       ├── controllers/    # Auth, Reserve, Guest, Payment, Unit, Service,
│   │       │                   # MaintenanceReport, IncidentReport, Currency, Origin, Method
│   │       ├── models/         # Modelos (Sequelize/TS)
│   │       ├── routes/
│   │       ├── middleware/     # auth, validation
│   │       └── config/         # db, cron, mailer, rate limiter
│   │
│   ├── ai-backend/             # Servicio de IA - Python + FastAPI
│   │   ├── app/
│   │   │   ├── api/v1/         # chat.py, reports.py, health.py
│   │   │   ├── services/       # ai_service.py, llm_client.py
│   │   │   └── db/             # modelos + migraciones (Alembic)
│   │   └── migrations/
│   │
│   └── frontend/               # React + TypeScript + Vite
│       └── src/
│           ├── pages/          # Dashboard, RoomsOverview, Mantenimiento, Reports, Login...
│           ├── components/     # dashboard, reservas, reportes, modals, charts
│           ├── hooks/, services/, store/  # Redux + theming (dark/light)
│           └── routes/         # rutas públicas/protegidas
│
├── docker-compose.yml
└── package.json
```

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 19** + **TypeScript** + **Vite**
- **Redux** (store, theme slice) para estado global
- **React Router** (rutas públicas/protegidas)
- Gráficos de ocupación (donut charts)
- Theming claro/oscuro
- Nginx para servir el build en producción

### Backend (API principal)

- **Node.js** + **Express** + **TypeScript**
- Autenticación con JWT + middleware de auth/validación
- Cron jobs, rate limiting, envío de emails (nodemailer)
- Colecciones de Postman incluidas para probar la API (`Hoster.postman_collection.json`, `Reserve.postman_collection.json`)

### AI Backend

- **Python** + **FastAPI**
- **Alembic** para migraciones de base de datos
- Cliente LLM propio (`llm_client.py`) para generación de reportes y chat asistido

### Infraestructura

- **Docker** (un `Dockerfile` por servicio) + **Docker Compose** para orquestar los tres servicios juntos

### Prerrequisitos

- Node.js (v18+)
- Python 3.11+
- pnpm / npm
- Docker y Docker Compose (opcional, ver sección de abajo)

## Sobre este fork

Proyecto original desarrollado en equipo durante el programa de formación de **Igrowker**. Este fork contiene ajustes personales posteriores a la finalización del programa, enfocados en pulir detalles pendientes para portfolio.
