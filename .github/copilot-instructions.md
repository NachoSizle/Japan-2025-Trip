---
applyTo: '**'
---


# � Instrucciones para Agentes de IA en Japan-2025-Trip

Estas directrices están diseñadas para que los agentes de IA sean productivos y mantengan la coherencia del proyecto.

## 🏗️ Arquitectura y Patrones Clave

- **Astro + Islands**: El proyecto usa Astro como framework principal, con componentes interactivos en React y SolidJS. Los componentes de UI se encuentran en `src/components/` y las páginas en `src/pages/`.
- **Navegación de Itinerario**: La navegación entre días del itinerario se gestiona con el componente `DayNavigation.astro`, que permite avanzar/retroceder entre días y volver al índice.
- **Datos**: La información del itinerario y vuelos está en archivos JSON bajo `src/data/`.
- **Estilos**: Se utiliza Tailwind CSS y estilos locales en los componentes. Prioriza mantener los estilos junto al componente cuando sea posible.
- **Modo Claro/Oscuro**: El diseño soporta ambos modos y debe mantenerse la coherencia visual.

## ⚙️ Flujos de Desarrollo

 - **Instalación**: `bun install` y `bun run dev` para desarrollo local.

- **Actualización de dependencias**: Usa `bun upgrade` para actualizar todas las dependencias o `bun add <paquete>` para agregar nuevas. Tras actualizar, revisa que la app funcione correctamente y no haya advertencias en consola.
- **Commits**: Usa mensajes alegres y descriptivos, con emojis y lista de cambios clave. Ejemplo:
  ```
  feat(components): ✨ Mejoras en navegación de días en el itinerario 🚀

  ### 📝 Cambios principales:
  * 🔄 Refactorización del componente `DayNavigation` para mayor legibilidad y mantenibilidad.
  * 🎨 Ajuste de estilos para mejor soporte de modo claro y responsividad.
  * 🧭 Navegación más intuitiva entre días y acceso rápido al itinerario principal.
  ```
- **Push**: Tras cada commit importante, pregunta si se debe subir a remoto.
- **Refactorización**: Antes de modificar, analiza el contexto y busca patrones existentes.
- **Migración de Componentes**: Si migras componentes interactivos, sigue la estrategia de "wrapper .astro" y usa `client:visible` como directiva preferida.

## � Depuración y Resolución de Problemas

- Explica los errores y sugiere soluciones claras.
- Para errores de hidratación en Astro, sigue el enfoque de wrapper y directiva `client:visible`.

## 📚 Documentación y Buenas Prácticas

- Explica conceptos técnicos con ejemplos del proyecto.
- Genera documentación clara y útil en los cambios relevantes.
- Mantén la accesibilidad y el SEO como prioridades.

## 🔄 Proceso de Modificación de Archivos

Antes de realizar cualquier cambio en un archivo existente, sigue este proceso:

1.  **Lectura y Comprensión**: Lee el contenido completo del archivo para entender su propósito, lógica, dependencias y cómo se integra en el proyecto. Presta atención a los comentarios, la estructura y los patrones de código existentes.
2.  **Análisis de Requisitos**: Revisa los cambios solicitados o la tarea a realizar. Identifica las secciones específicas del archivo que se verán afectadas y cómo la modificación impactará el comportamiento general.
3.  **Propuesta de Solución**: Formula una solución clara y concisa. Considera las mejores prácticas, la coherencia con el código existente y la eficiencia. Si hay múltiples enfoques, evalúa sus pros y contras.
4.  **Implementación**: Aplica los cambios propuestos. Asegúrate de mantener la indentación, el formato y la sintaxis correctos. Si es necesario, añade comentarios para explicar la nueva lógica o las decisiones de diseño.
5.  **Verificación**: Una vez realizados los cambios, verifica que la aplicación funcione correctamente y que los cambios se hayan aplicado según lo esperado. Realiza pruebas si es necesario.
## 📦 Gestión y Edición de Datos

- **Edición de archivos JSON**: Para agregar o modificar información del itinerario o vuelos, edita los archivos en `src/data/`. Tras cualquier cambio, valida visualmente en la UI que los datos se reflejan correctamente y no hay errores de formato.


## 🗂️ Estructura del Proyecto
- `src/components/` — Componentes UI reutilizables (Astro, React, SolidJS)
- `src/pages/` — Páginas principales y rutas dinámicas
- `src/data/` — Datos del itinerario y vuelos
- `public/` — Assets estáticos e iconos

---
Estas reglas resumen los patrones y convenciones reales del proyecto. Si algo no está claro o falta, pregunta antes de actuar.