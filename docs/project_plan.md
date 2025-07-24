# ⛩️ Arquitectura y Decisiones de Diseño

Este documento detalla las decisiones de arquitectura, diseño y tecnología que dieron forma al proyecto **Japan 2025 Trip**.

---

## 🎯 Filosofía del Proyecto

El objetivo principal era crear una **herramienta de viaje viva y funcional** que no solo organizara la información, sino que también capturara la emoción y la estética del viaje a Japón. Las decisiones se guiaron por tres pilares:

1.  **Rendimiento Extremo**: Para ser útil en movilidad, el sitio debía ser ultrarrápido y accesible incluso con conexiones lentas.
2.  **Experiencia Inmersiva**: El diseño debía reflejar una estética japonesa moderna (neón, cyberpunk) y ser altamente interactivo.
3.  **Utilidad Práctica**: Debía resolver problemas reales del viaje, con un fuerte enfoque en la guía para celíacos.

---

## 🛠️ Stack Tecnológico: El Porqué de la Elección

| Tecnología | Decisión y Justificación |
| :--- | :--- |
| **Astro** | Elegido por su arquitectura de **"islas"** y su enfoque en **Static Site Generation (SSG)**. Esto garantiza un rendimiento de carga casi instantáneo, enviando HTML puro y cargando JavaScript solo para los componentes interactivos. |
| **Tailwind CSS** | Se seleccionó para permitir un **desarrollo de UI rápido y consistente**. Su enfoque *utility-first* facilitó la creación de un sistema de diseño coherente y la implementación de un tema claro/oscuro de manera eficiente. |
| **Alpine.js** | Para la **interactividad ligera del lado del cliente**. Se integró para manejar estados simples como el menú responsive, los filtros del itinerario y el toggle del tema, sin necesidad de un framework de JS más pesado. |
| **TypeScript** | Imprescindible para la **robustez y mantenibilidad** del código. Ayudó a prevenir errores en el manejo de la estructura de datos del itinerario y a asegurar la correcta comunicación entre componentes. |
| **VitePWA** | La necesidad de **acceso offline** durante el viaje hizo que convertir la aplicación en una PWA fuera una prioridad. Se eligió `@vite-pwa/astro` por su integración nativa y sencilla. |
| **OneSignal** | Para las **notificaciones push**, se optó por OneSignal por su generoso plan gratuito, su facilidad de configuración y su robusta API para implementar recordatorios. |

---

## 🏗️ Arquitectura de la Aplicación

### Estructura de Datos Centralizada

Todo el itinerario reside en `src/data/itinerario.json`. Esta decisión fue clave para:
- **Facilitar la gestión**: Actualizar el plan de viaje en un único lugar.
- **Consistencia de datos**: Asegurar que todos los componentes consuman la misma información.

### Generación de Páginas Dinámicas

La ruta `src/pages/itinerario/[dia].astro` genera automáticamente una página para cada día del viaje, utilizando el `id` del día como parámetro. Esto mantiene las URLs limpias y automatiza la creación de contenido.

### Estructura de Componentes Clave

El proyecto se organiza en componentes atómicos y funcionales con responsabilidades claras:

- **`Layout.astro`**: El esqueleto principal de todas las páginas. Incluye el `Header`, el `Footer` y la configuración base del tema.
- **`Timeline.astro`**: El componente más complejo. Contiene la lógica para mostrar el contenido correcto según la fecha actual y renderiza los `DayCard` y `FlightCard`.
- **`SistemaFiltros.astro`**: Gestiona la lógica de filtrado del itinerario en el lado del cliente, interactuando con los `DayCard` para mostrar u ocultar información.
- **`DayCard.astro` / `FlightCard.astro`**: Tarjetas que muestran la información de un día o un vuelo específico. Son componentes de presentación puros que reciben datos del `Timeline`.
- **`WeatherWidget.astro`**: Un componente aislado que realiza una llamada a una API externa y muestra el clima, demostrando la capacidad de Astro para crear islas de interactividad.

---

## ✨ Diseño Visual y UX

### Paleta de Colores Temática

- **Modo Oscuro (Principal)**: Inspirado en los neones de Shinjuku y Akihabara (fucsia, cian, púrpuras).
- **Modo Claro**: Más sereno y tradicional (rosa sakura, verde zen), optimizado para la lectura diurna.

### Funcionalidad Inteligente para una UX Superior

- **Timeline Consciente del Tiempo**: La lógica implementada en `Timeline.astro` hace que la página se sienta viva y relevante.
- **Filtros No Destructivos**: El uso de Alpine.js permite una experiencia de filtrado instantánea sin recargar la página.

---

## 🎌 Conclusión Arquitectónica

El proyecto es un ejemplo práctico de cómo utilizar un stack moderno (Astro, Tailwind, Alpine.js) para construir una PWA de alto rendimiento y visualmente rica. La arquitectura prioriza la experiencia del usuario, la utilidad práctica y la facilidad de mantenimiento.