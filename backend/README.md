# Testimonial CMS - Backend

Backend del proyecto de hackathon **No Country** para un **CMS de testimonios** orientado al sector **EdTech**. Esta API permite registrar organizaciones, autenticar usuarios, administrar productos, clasificar contenido con tags y gestionar testimonios con soporte multimedia.

## Contexto del desafío

Muchas instituciones, bootcamps y empresas EdTech necesitan mostrar el impacto de sus programas a partir de historias reales de sus estudiantes, clientes o comunidades. Este backend nace para resolver esa necesidad con una API preparada para:

- recopilar testimonios en texto, imagen o video;
- moderar y publicar historias;
- organizar contenido por productos y tags;
- exponer información pública para integraciones externas.

## Qué resuelve este backend hoy

### Funcionalidades implementadas

- Registro de organización con usuario inicial.
- Login con **JWT en cookie HttpOnly**.
- Gestión de miembros por organización.
- CRUD de productos.
- Endpoint público para obtener un producto por `shareCode`.
- CRUD de tags y consulta de tags más usados.
- Registro de testimonios autenticados y públicos.
- Soporte para imagen vía **Cloudinary** y video vía **URL de YouTube**.
- CRUD de reviews.
- Consulta de visitantes y archivos multimedia.
- Documentación OpenAPI/Swagger.
- Migraciones con Flyway y datos semilla para demo.

### Estado frente al alcance de hackathon

Este backend ya cubre una parte importante del MVP, pero hay requerimientos del reto que hoy están **parciales o pendientes**:

- `Parcial`: flujo de moderación. Existe estado en testimonios (`PENDING`, `APPROVED`, `REJECTED`, `PUBLISHED`) y reviews.
- `Parcial`: API pública. Hoy existe consumo público por `shareCode` y alta pública de testimonios.
- `Pendiente`: embeds listos para incrustar en sitios externos.
- `Pendiente`: búsqueda inteligente.
- `Pendiente`: analítica de engagement.
- `Pendiente`: suite de tests automatizados.
- `Pendiente`: integración directa con API oficial de YouTube; actualmente se persiste la URL.

## Stack técnico

- **Java 25**
- **Spring Boot 4**
- **Spring Security**
- **Spring Data JPA**
- **Flyway**
- **PostgreSQL**
- **H2** para perfil de test
- **Cloudinary**
- **MapStruct**
- **Springdoc OpenAPI / Swagger UI**
- **Resilience4j**

## Estructura funcional

El proyecto está organizado por módulos:

- `security`: autenticación, autorización, membresías y roles.
- `organization`: gestión de organizaciones.
- `product`: productos y `shareCode` público.
- `tag`: clasificación y conteo de etiquetas.
- `testimonial`: flujo principal de testimonios.
- `review`: revisión/comentarios internos.
- `media`: archivos multimedia asociados a testimonios.
- `visitor`: datos de quien envía el testimonio.
- `cloudinary`: integración de carga y borrado de archivos.
- `swagger`: documentación de la API.

## Roles implementados

En el estado actual del backend, los roles que existen son:

- `CMS_ADMIN`
- `OWNER`
- `ADMIN`
- `STAFF`

Para el discurso del challenge, esto puede mapearse de forma aproximada a:

- `OWNER` / `ADMIN` -> administración y operación del CMS
- `STAFF` -> edición/consulta interna
- visitante externo -> flujo público sin autenticación mediante `shareCode`

## Variables de entorno

Tomá como referencia `example.env`. Las variables necesarias son:

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

Importante:

- El proyecto tiene `prod` como perfil activo por defecto.
- Para desarrollo local conviene iniciar con perfil `dev`.
- Spring Boot no carga `.env` automáticamente por sí solo; asegurate de exponer estas variables en tu entorno o desde tu IDE.

## Ejecución local

### 1) Requisitos

- JDK 25
- PostgreSQL levantado
- Variables de entorno configuradas

### 2) Levantar la API en desarrollo

```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=dev"
```

### 3) Ejecutar el jar

```powershell
.\mvnw.cmd clean package
java -jar target\cms-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev
```

## Perfiles disponibles

- `dev`: PostgreSQL, `ddl-auto=update`, Flyway deshabilitado.
- `prod`: PostgreSQL, validación de esquema, Flyway habilitado.
- `test`: H2 en memoria.
- `oci`: configuración orientada a Oracle Cloud / Oracle DB.

## Documentación de API

Con la aplicación levantada:

- Swagger UI: `http://localhost:8080/docs/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/docs/v3/api-docs`

## Endpoints principales

### Auth

- `POST /api/v1/auth/register-org`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/register-members`
- `POST /api/v1/auth/logout`

### Organizations

- `GET /api/v1/organizations/getAll`
- `GET /api/v1/organizations/getOnly`
- `PUT /api/v1/organizations`
- `DELETE /api/v1/organizations`

### Products

- `POST /api/v1/products/register`
- `GET /api/v1/products`
- `GET /api/v1/products/{id}`
- `PUT /api/v1/products/{id}`
- `DELETE /api/v1/products/{id}`
- `GET /api/v1/products/public/{shareCode}`

### Tags

- `POST /api/v1/tags/register`
- `GET /api/v1/tags`
- `GET /api/v1/tags/top`
- `GET /api/v1/tags/{id}`
- `PUT /api/v1/tags/{id}`
- `DELETE /api/v1/tags/{id}`

### Testimonials

- `POST /api/v1/testimonials/register`
- `POST /api/v1/testimonials/public/register`
- `GET /api/v1/testimonials`
- `GET /api/v1/testimonials/all`
- `GET /api/v1/testimonials/{id}`
- `PUT /api/v1/testimonials/{id}`
- `DELETE /api/v1/testimonials/{id}`

### Reviews

- `POST /api/v1/reviews/register`
- `GET /api/v1/reviews`
- `GET /api/v1/reviews/{id}`
- `PUT /api/v1/reviews/{id}`
- `DELETE /api/v1/reviews/{id}`

### Visitors y Media

- `GET /api/v1/visitors`
- `GET /api/v1/visitors/{id}`
- `PUT /api/v1/visitors/{id}`
- `DELETE /api/v1/visitors/{id}`
- `GET /api/v1/medias`
- `GET /api/v1/medias/{id}`

## Flujo sugerido de uso

### Flujo interno del CMS

1. Registrar organización.
2. Iniciar sesión.
3. Crear productos.
4. Crear tags y asociarlos a productos.
5. Compartir el `shareCode` del producto.
6. Recibir testimonios públicos o autenticados.
7. Revisar/moderar testimonios.

### Flujo público

1. Consumir `GET /api/v1/products/public/{shareCode}`.
2. Enviar testimonio a `POST /api/v1/testimonials/public/register`.
3. Asociar el testimonio al producto correcto usando `shareCode`.

## Base de datos y seeds

El proyecto incluye migraciones en `src/main/resources/db/migration`:

- `V1__init_schema.sql`: schema completo.
- `V2__init_modules_operations_roles.sql`: módulos, operaciones y permisos.
- `V3__insert_admin_user.sql`: organización y usuario admin semilla.
- `V4__insert_default_products.sql`: productos demo para la organización semilla.

### Importante sobre el usuario admin semilla

Antes de ejecutar por primera vez las migraciones, reemplazá la contraseña placeholder del archivo `src/main/resources/db/migration/V3__insert_admin_user.sql` por una contraseña en formato **BCrypt**.

- El backend autentica con `BCryptPasswordEncoder`.
- El valor actual del seed es sólo un placeholder y no sirve para login real.
- Antes de correr la app, generá tu hash BCrypt y sustituí `'{noop}pon_tu_contraseña_aqui'` por ese valor.

Ejemplo esperado:

```sql
INSERT INTO users (name, email, password)
VALUES ('admin', 'admin@cms.com', '$2a$12$...');
```

## Datos demo

Se cargan productos iniciales del dominio EdTech, por ejemplo:

- Plataforma de Cursos Online
- Bootcamp de Programación Fullstack
- App de Aprendizaje de Idiomas
- Certificación en Data Science
- Simulador de Entrevistas Técnicas

Esto ayuda a mostrar rápidamente el flujo de captura pública de testimonios durante la demo.

## Limitaciones actuales

- No hay tests automatizados todavía.
- No hay endpoint específico de embeds.
- No hay buscador avanzado ni ranking de engagement.
- La integración de YouTube hoy es por URL, no por consumo de API oficial.
- La documentación Swagger necesita seguir alineándose con todos los roles y contratos reales.

## Próximos pasos recomendados

- Agregar tests unitarios e integrales.
- Incorporar filtros por estado, producto y tag en testimonios.
- Exponer endpoints públicos de listado para integraciones externas.
- Implementar embeds reutilizables para sitios terceros.
- Agregar métricas de engagement y auditoría de moderación.
- Endurecer configuración de seguridad y despliegue para producción.

## Equipo / Hackathon

Proyecto desarrollado en el contexto de **No Country Hackathon**, con foco en un **Testimonial CMS para EdTech**: una plataforma para capturar, organizar y publicar historias reales de impacto.
