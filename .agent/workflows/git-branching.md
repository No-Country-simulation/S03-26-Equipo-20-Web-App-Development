---
description: Cómo crear ramas y hacer merge en este proyecto
---

## Flujo de ramas del equipo

El proyecto sigue esta jerarquía de ramas:

```
main
 └── frontend
       └── feat/<nombre-de-la-tarea>   ← acá se trabaja
```

## Pasos

1. Asegurarse de estar en la rama `frontend` y actualizada:
   ```bash
   git checkout frontend
   git pull
   ```

2. Crear y moverse a la nueva rama de feature:
   ```bash
   git checkout -b feat/<nombre-descriptivo>
   # Ejemplos:
   #   feat/add-login-and-register
   #   feat/organization-profile-page
   ```

3. Hacer los cambios y commitear normalmente:
   ```bash
   git add .
   git commit -m "feat: descripción del cambio"
   ```

4. Pushear la rama al remoto:
   ```bash
   git push -u origin feat/<nombre-descriptivo>
   ```

5. Hacer **merge de la feature a `frontend`** (o abrir un PR en GitHub):
   ```bash
   git checkout frontend
   git merge feat/<nombre-descriptivo>
   git push
   ```

6. El merge de `frontend` a `main` lo maneja el equipo cuando haya una release.

## Nombres de ramas sugeridos
- `feat/` para nuevas funcionalidades
- `fix/` para correcciones de bugs
- `chore/` para tareas de mantenimiento sin impacto en features
