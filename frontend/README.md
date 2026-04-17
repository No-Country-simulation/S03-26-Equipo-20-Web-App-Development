# Testimonial CMS Frontend

Frontend del proyecto de hackatón **No Country** para el reto **Testimonial CMS**, una plataforma orientada al sector **EdTech** para recopilar, moderar, organizar y publicar testimonios en distintos formatos.

Este repositorio contiene la interfaz construida con **React + TypeScript + Vite**, enfocada en la experiencia de administración del CMS y en la captura pública de testimonios.

## Contexto del reto

Las instituciones y empresas con comunidades activas necesitan mostrar el impacto de sus programas, productos o servicios a través de historias reales. La propuesta de este proyecto es construir un CMS especializado para:

- recopilar testimonios en texto, imagen y video;
- clasificarlos por productos y etiquetas;
- revisarlos antes de publicarlos;
- compartirlos mediante enlaces o embebidos en otros sitios;
- facilitar su gestión desde un dashboard administrativo.

## Qué resuelve este frontend

Actualmente el frontend cubre principalmente estos flujos:

- landing pública del producto;
- login y registro de organización;
- dashboard administrativo;
- gestión de productos;
- gestión de etiquetas;
- listado y revisión visual de testimonios;
- formulario público para envío de testimonios;
- vista tipo **Wall of Love** con opciones de share/embed.

## Stack técnico

- **React 19**
- **TypeScript**
- **Vite**
- **React Router DOM**
- **Formik**
- **Yup**
- **Tailwind CSS v4**
- **Lucide React**
- **React Hot Toast**

## Módulos principales

### 1. Autenticación

- Inicio de sesión de organización.
- Registro de organización.
- Protección de rutas privadas.

### 2. Gestión de productos

- Crear productos.
- Editar productos.
- Eliminar productos.
- Asociar etiquetas.
- Generar enlace público por `shareCode` para capturar testimonios.

### 3. Gestión de testimonios

- Formulario público de envío.
- Soporte visual para texto, imagen y video de YouTube.
- Listado de testimonios dentro del CMS.
- Vista de moderación.

### 4. Wall of Love

- Vista previa de testimonios aprobados.
- Opciones visuales para embed.
- Copia de snippet React/HTML.

### 5. Gestión de etiquetas

- Crear, editar y eliminar tags.
- Visualización por uso.

## Estado actual del proyecto

El frontend ya muestra una base funcional para demo, pero todavía está en integración con backend y hay partes del reto que siguen en construcción.

### Implementado o parcialmente implementado

- autenticación contra backend;
- CRUD de productos;
- CRUD de tags;
- consumo de endpoints para productos y tags;
- envío público de testimonios vía formulario;
- paneles visuales de dashboard, moderación y wall.

### En progreso o pendiente

- estabilizar tipados para que `build` y `lint` pasen sin errores;
- terminar la moderación operativa de testimonios;
- reemplazar datos mock en `Wall of Love` y algunos flujos de testimonios;
- cerrar la integración multimedia completa con YouTube y Cloudinary;
- completar roles del reto (`admin`, `editor`, `visitante`) de punta a punta;
- documentar y consumir la API pública externa del CMS.

## Requisitos

- **Node.js** 20+ recomendado
- **npm**
- backend disponible localmente o por URL remota

## Variables de entorno

Creá un archivo `.env` en la raíz del frontend con estas variables:

```env
VITE_BASE_URL_AUTH=http://localhost:8080/api/v1/auth
VITE_BASE_URL=http://localhost:8080/api/v1
VITE_FRONTEND_URL=http://localhost:5173
```

También podés usar [example.env](/E:/NoCountry/simulacion-marzo/complete_project/frontend/example.env).

## Instalación y ejecución

```bash
npm install
npm run dev
```

Para otras tareas:

```bash
npm run lint
npm run build
npm run preview
```

## Rutas principales

- `/` o `/landing`: landing pública
- `/login`: acceso de organización
- `/register`: registro
- `/dashboard`: panel principal
- `/products`: gestión de productos
- `/products/:idProduct`: detalle y edición de producto
- `/tags`: gestión de etiquetas
- `/moderation`: revisión de testimonios
- `/wall-of-love`: vista de publicación/embebido
- `/testimonials/submit?share_code=...`: envío público de testimonios

## Estructura del proyecto

```text
src/
  assets/              Recursos visuales
  components/          Componentes reutilizables
  context/             Estado global de autenticación
  pages/               Pantallas principales
  provider/            Providers de la app
  routes/              Guards y rutas protegidas
  services/            Integración con backend
  styles/              Estilos globales y por módulo
  types/               Tipos TypeScript
  utils/               Helpers y validaciones
```

## Arquitectura frontend

El proyecto está organizado con una separación simple por responsabilidad:

- `pages` para vistas completas;
- `components` para piezas reutilizables;
- `services` para llamadas HTTP;
- `types` para contratos de datos;
- `context` para autenticación y sesión.

Este enfoque facilita iterar rápido en hackatón, sin perder claridad para futuras mejoras.

## Relación con el reto No Country

Este frontend responde al desafío de construir un CMS especializado en testimonios para instituciones y organizaciones con comunidades activas. La propuesta se alinea especialmente con:

- gestión y curaduría de testimonios;
- clasificación por productos y tags;
- revisión previa a publicación;
- experiencia de integración externa mediante share links y embed;
- base para dashboard administrativo.

## Próximos pasos sugeridos

- corregir errores de TypeScript y ESLint;
- conectar moderación real con backend;
- completar soporte multimedia robusto;
- consolidar roles y permisos;
- agregar documentación de API y demo embebida externa.

## Equipo / hackatón

Proyecto desarrollado para hackatón **No Country** como solución frontend para **Testimonial CMS**.

Si querés continuar este proyecto, el siguiente paso recomendado es estabilizar la integración con backend y dejar el flujo completo de testimonios listo para demo end-to-end.
