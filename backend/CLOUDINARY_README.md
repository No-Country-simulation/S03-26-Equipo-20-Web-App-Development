# Integración con Cloudinary - Testimonial CMS

Este repositorio/módulo ahora incluye la funcionalidad para subir elementos multimedia a la API de Cloudinary utilizando **Spring Cloud OpenFeign** en conjunto con prácticas de tolerancia a errores de **Resilience4j**.

## Cambios Implementados

1. **Cliente Feign (`ICloudinaryClient`)**:
   - Interfaz configurada para consumir `multipart/form-data`. Soporta de manera nativa la clase `MultipartFile` de Spring, lo cual permite enviar archivos o imágenes hacia los servidores de Cloudinary de forma cómoda.

2. **Mapeo de Datos (`CloudinaryUploadResponseDTO`)**:
   - Data Object que extrae únicamente los valores que más nos importan desde las respuestas de Cloudinary: el `public_id` (para administrar en el futuro el archivo) y la URL segura de la imagen (`secure_url`).

3. **Circuit Breaker y Fallback (`CloudinaryClientFallback`)**:
   - Un mecanismo de respuesta por defecto integrado con **Resilience4j**. Si la API de Cloudinary está caída o arroja errores fuera de ciertos límites, el Circuit Breaker intercepata la llamada y este método devuelve un DTO con una URL e ID estáticos seguros. Esto evita que la plataforma entera falle por lentitud en la API externa.

4. **Configuraciones (`application.yaml` y `.java`)**:
   - Se habilitó `@EnableFeignClients` a nivel master de Spring Boot en `CmsApplication`.
   - Se establecieron variables de `resilience4j` para establecer los límites máximos de fallo, estado *Half-Open*, re-intentos (Retry) y la URL base dentro del archivo de propiedades (`application.yaml`).

## ¿Cómo utilizarlo?

Para usarlo en la capa de servicios de tus controladores, solamente inyecta `ICloudinaryClient` y llama a su método enviándole los parámetros pertinentes:

```java
cloudinaryClient.uploadMedia("tu-cloud-name", "image", tu_archivo_multipart, "mi-upload-preset");
```
