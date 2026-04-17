# Testimonial CMS

Proyecto full stack desarrollado en el contexto de **No Country Hackathon** para el reto **Testimonial CMS**. La solución está orientada al sector **EdTech** y busca permitir la captura, moderación, organización y publicación de testimonios en formatos como texto, imagen y video.

Este repositorio reúne:

- un **backend** con API para autenticación, organizaciones, productos, tags, testimonios, reviews y media;
- un **frontend** para la administración del CMS y la captura pública de testimonios.

## Visión general

La propuesta responde a la necesidad de instituciones, bootcamps y empresas EdTech de mostrar historias reales de impacto a través de una plataforma que permita:

- recopilar testimonios en distintos formatos;
- clasificarlos por productos y etiquetas;
- revisarlos antes de publicarlos;
- compartirlos mediante enlaces públicos y experiencias tipo embed;
- administrarlos desde un dashboard.

## Estructura del repositorio

```text
complete_project/
  backend/   API y lógica de negocio
  frontend/  interfaz web del CMS
```

Documentación específica:

- [README del backend](./backend/README.md)
- [README del frontend](./frontend/README.md)

## Stack del proyecto

### Backend

- Java 25
- Spring Boot 4
- Spring Security
- Spring Data JPA
- Flyway
- PostgreSQL
- H2 para perfil de test
- Cloudinary
- MapStruct
- Springdoc OpenAPI / Swagger UI
- Resilience4j

### Frontend

- React 19
- TypeScript
- Vite
- React Router DOM
- Formik
- Yup
- Tailwind CSS v4
- Lucide React
- React Hot Toast

## Qué cubre hoy el MVP

### Backend

- registro de organización y login con JWT en cookie HttpOnly;
- gestión de miembros;
- CRUD de productos;
- endpoint público por `shareCode`;
- CRUD de tags;
- registro de testimonios autenticados y públicos;
- soporte para imagen con Cloudinary y video por URL de YouTube;
- CRUD de reviews;
- documentación Swagger/OpenAPI;
- migraciones Flyway y datos semilla.

### Frontend

- landing pública;
- login y registro de organización;
- dashboard administrativo;
- gestión de productos y tags;
- listado y revisión visual de testimonios;
- formulario público de envío;
- vista tipo **Wall of Love** con opciones de share/embed.

## Estado actual

El proyecto ya tiene una base funcional para demo, pero todavía conserva partes parciales o pendientes.

Pendientes o en progreso más relevantes:

- estabilizar `build` y `lint` del frontend;
- cerrar la moderación operativa de testimonios;
- reemplazar datos mock en algunos flujos del frontend;
- completar la integración multimedia;
- consolidar roles y permisos de punta a punta;
- incorporar tests automatizados;
- exponer mejor la API pública y los embeds reutilizables.

## Cómo levantar el proyecto

### Requisitos

### Backend

- JDK 25
- PostgreSQL
- variables de entorno configuradas

### Frontend

- Node.js 20+ recomendado
- npm
- backend disponible localmente o por URL remota

### Variables de entorno

### Backend

Tomá como referencia `backend/example.env`:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=your_database

JWT_KEY_SIGNER_PUBLIC=BASE_64
JWT_KEY_SIGNER_PRIVATE=BASE_64
JWT_TOKEN_EXPIRATION=1200
COOKIE_JWT_EXPIRATION=7

CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
CLOUDINARY_CLOUD_NAME=tu_cloud_name
```

Notas importantes del backend:

- el perfil activo por defecto es `prod`;
- para desarrollo local conviene usar `dev`;
- Spring Boot no carga `.env` automáticamente por sí solo.

### Frontend

Crear `frontend/.env` con:

```env
VITE_BASE_URL_AUTH=http://localhost:8080/api/v1/auth
VITE_BASE_URL=http://localhost:8080/api/v1
VITE_FRONTEND_URL=http://localhost:5173
```

### Ejecución local

### 1. Levantar el backend

Desde `backend/`:

```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=dev"
```

Opcionalmente:

```powershell
.\mvnw.cmd clean package
java -jar target\cms-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev
```

Documentación de API disponible en:

- `http://localhost:8080/docs/swagger-ui.html`
- `http://localhost:8080/docs/v3/api-docs`

### 2. Levantar el frontend

Desde `frontend/`:

```bash
npm install
npm run dev
```

Comandos útiles:

```bash
npm run lint
npm run build
npm run preview
```

## Flujo general de uso

1. Registrar organización o iniciar sesión desde el frontend.
2. Crear productos y etiquetas desde el CMS.
3. Compartir el `shareCode` del producto.
4. Recibir testimonios desde el formulario público.
5. Revisar y moderar testimonios desde el panel administrativo.
6. Publicarlos o utilizarlos en la vista tipo **Wall of Love**.

## Módulos principales

### Backend

- `security`
- `organization`
- `product`
- `tag`
- `testimonial`
- `review`
- `media`
- `visitor`
- `cloudinary`
- `swagger`

### Frontend

- `assets`
- `components`
- `context`
- `pages`
- `provider`
- `routes`
- `services`
- `styles`
- `types`
- `utils`

## Perfiles y rutas relevantes

### Backend

Perfiles disponibles:

- `dev`
- `prod`
- `test`
- `oci`

### Frontend

Rutas principales:

- `/`
- `/landing`
- `/login`
- `/register`
- `/dashboard`
- `/products`
- `/products/:idProduct`
- `/tags`
- `/moderation`
- `/wall-of-love`
- `/testimonials/submit?share_code=...`

## Siguientes referencias

Si necesitás más detalle de endpoints, seeds, perfiles, módulos internos o flujos particulares, revisá:

- [backend/README.md](./backend/README.md)
- [frontend/README.md](./frontend/README.md)
