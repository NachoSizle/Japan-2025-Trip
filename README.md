# 🇯🇵 Japan 2025 Trip Website

<div align="center">

![Estado](https://img.shields.io/badge/Estado-✅%20Listo%20para%20el%20viaje-32CD32?style=for-the-badge)
![Progreso](https://img.shields.io/badge/Progreso-98%25-FF1493?style=for-the-badge)
![Fechas](https://img.shields.io/badge/📅-14–28%20Agosto%202025-8A2BE2?style=for-the-badge)

**Una experiencia web interactiva para documentar y planificar nuestro viaje soñado a Japón.**
<br/>
*Este proyecto está diseñado con 💖 para crear recuerdos inolvidables.*

🌐 **[Ver Sitio en Vivo](https://nachosizle.github.io/Japan-2025-Trip/)** 

[⭐ Características](#-características-destacadas) • [🚀 Instalación](#-instalación) • [🛠️ Tecnologías](#️-tecnologías) • [🌟 Próximas Mejoras](#-próximas-mejoras)

</div>

---

## 🎯 Estado del Proyecto: ¡Listo para el Viaje!

El proyecto está **virtualmente completo (98%)** y listo para ser la herramienta principal durante el viaje. Todas las funcionalidades críticas y avanzadas están implementadas, el diseño es responsive y la experiencia de usuario es fluida y temática.

---


## 🎛️ Sistema de Filtros de Actividades

El sistema de filtros permite seleccionar actividades por tipo y por ciudad. Los tipos de actividad disponibles incluyen:

- **Todo**
- 🌾🚫 **Sin Gluten**
- ⭐ **Destacados**
- 🗼 **Turismo**
- 🍱 **Comida**
- 🚄 **Transporte**
- 🏨 **Alojamiento**
- 🛍️ **Compras**
- 🏯 **Cultura**
- 🌸 **Naturaleza**

Cada filtro tiene un color distintivo para facilitar la identificación visual. Al seleccionar un filtro, solo se muestran las actividades relevantes dentro de cada día, en lugar de mostrar la tarjeta del día completa. También puedes combinar el filtro de tipo con el filtro de ciudad para ver solo las actividades de una ciudad específica.

El filtro "Sin Gluten" muestra únicamente actividades que ofrecen opciones sin gluten. El filtro "Destacados" resalta actividades marcadas como importantes. El filtro "Alojamiento" muestra un enlace especial "Ver en mapa" si la actividad tiene una ubicación de Google Maps.

## ✅ Checklist Interactiva de Viaje

El sistema de checklist es una herramienta completa para organizar todo el equipaje del viaje. Incluye funcionalidad CRUD completa con persistencia automática y adaptación de temas en tiempo real.

### 🎯 **Funcionalidades Principales**
- **📝 Gestión Completa**: Añadir, editar y eliminar ítems personalizados
- **✅ Estado Persistente**: Marcar/desmarcar ítems con guardado automático en localStorage
- **🔍 Filtros Inteligentes**: Ver todos los ítems, solo completados o solo pendientes
- **🔎 Búsqueda en Tiempo Real**: Encontrar ítems específicos instantáneamente
- **📱 100% Responsive**: Optimizado para uso móvil durante el viaje

### 🎨 **Características Técnicas**
- **🎭 Adaptación Automática de Temas**: Se adapta instantáneamente al cambio claro/oscuro
- **💾 Persistencia Offline**: Funciona completamente sin conexión a internet
- **⚡ SolidJS Signals**: Gestión de estado reactivo y eficiente
- **🎪 Modal de Edición**: Interfaz intuitiva para modificar ítems
- **🌈 Categorías con Colores**: Cada categoría (Neceser, Ropa, Electrónica, etc.) tiene su gradiente único

### 📦 **Categorías Predefinidas**
- **🧴 Neceser**: Productos de higiene y cuidado personal
- **👕 Ropa**: Prendas de vestir para diferentes climas
- **💊 Medicinas**: Medicamentos y botiquín de viaje  
- **🔌 Electrónica**: Dispositivos, cargadores y adaptadores
- **📄 Documentación**: Pasaportes, seguros y documentos importantes
- **🎒 Varios**: Otros elementos esenciales para el viaje

El checklist está accesible desde el header principal y tiene su propia página dedicada en `/checklist`.


## 🧭 Navegación entre Días del Itinerario

El itinerario cuenta con una navegación intuitiva entre días, permitiendo avanzar o retroceder fácilmente entre las jornadas del viaje. Un botón central permite volver rápidamente a la vista general del itinerario.

El componente `DayNavigation` ofrece:

- Acceso directo al día anterior y siguiente, si existen.
- Diseño visual coherente con el resto del sitio, adaptado a modo claro/oscuro y dispositivos móviles.
- Transiciones y estilos modernos para una experiencia fluida.

Esta navegación mejora la usabilidad y hace que explorar el viaje sea más cómodo y visualmente atractivo.

## ⭐ Características Destacadas

### 🧠 **Funcionalidad Inteligente**
- **Timeline Adaptativo**: El contenido se ajusta automáticamente según la fecha actual (antes, durante y después del viaje).
- **Contador Regresivo**: Un reloj en tiempo real que aumenta la emoción mostrando cuánto falta para el despegue.
- **Sistema de Filtros Avanzado**: Filtra el itinerario por ciudad, tipo de actividad (Turismo, Sin Gluten, Destacados) y más.
- **✅ Checklist Interactiva**: Sistema CRUD completo para organizar el equipaje con añadir/editar/eliminar ítems, filtros inteligentes y persistencia automática.
- **PWA (Progressive Web App)**: La aplicación se puede instalar en el móvil para acceso offline, ideal para usar en Japón sin depender de la conexión.
- **Notificaciones Push**: Alertas y recordatorios de actividades importantes del itinerario.
- **Widget del Clima**: Muestra el tiempo en tiempo real para la ciudad correspondiente del itinerario.

### 🎨 **Diseño Visual y UX**
- **Tema Japonés Neón**: Una estética cyberpunk con gradientes de fucsia, cian y púrpuras sobre fondos oscuros.
- **Modo Claro/Oscuro**: Toggle para cambiar entre un tema vibrante y uno más relajado, con adaptación automática en todos los componentes.
- **Animaciones Fluidas**: Efectos de hover, partículas flotantes y transiciones suaves que enriquecen la experiencia.
- **Diseño Responsive**: Totalmente optimizado para una navegación perfecta en móviles, tablets y escritorio.

### 🌾 **Enfoque Especializado: Guía Sin Gluten**
- **Base de Datos Curada**: Una lista de restaurantes verificados y seguros para celíacos en cada ciudad.
- **Frases de Supervivencia**: Tarjetas con frases esenciales en japonés (con romaji) para comunicar necesidades alimentarias.
- **Recursos Útiles**: Recomendaciones de apps y una guía de productos seguros en tiendas de conveniencia (konbini).

---

## 🚀 Instalación y Uso Local

```bash
# 1. Clona el repositorio
git clone https://github.com/NachoSizle/Japan-2025-Trip.git

# 2. Navega al directorio
cd Japan-2025-Trip

# 3. Instala las dependencias (se requiere Node.js)
npm install

# 4. Inicia el servidor de desarrollo
npm run dev
```
El sitio estará disponible en `http://localhost:4321` 🎌.

---

## 🛠️ Tecnologías

| Tecnología | Propósito |
| :--- | :--- |
| ![Astro](https://img.shields.io/badge/⚡-Astro-FF5A03?style=flat-square) | Framework SSG para máximo rendimiento. |
| ![SolidJS](https://img.shields.io/badge/🧩-SolidJS-4F75FF?style=flat-square) | Componentes reactivos para el checklist interactivo. |
| ![Tailwind CSS](https://img.shields.io/badge/🎨-Tailwind%20CSS-38BDF8?style=flat-square) | Diseño rápido y consistente con utilidades. |
| ![TypeScript](https://img.shields.io/badge/📘-TypeScript-3178C6?style=flat-square) | Tipado estático para un código robusto. |
| ![VitePWA](https://img.shields.io/badge/📱-VitePWA-646CFF?style=flat-square) | Funcionalidad de Progressive Web App. |
| ![OneSignal](https://img.shields.io/badge/🔔-OneSignal-FF0000?style=flat-square) | Envío de notificaciones push. |

---

## 🌟 Próximas Mejoras (Opcionales)

Aunque el proyecto ya está completo para su propósito principal, estas son algunas ideas para el futuro:

- [ ] **Mapas Interactivos**: Integrar Google Maps para visualizar rutas y ubicaciones directamente.
- [ ] **Feedback de Usuarios**: Permitir añadir comentarios o valoraciones a restaurantes y actividades.
- [ ] **Exportar Itinerario**: Funcionalidad para exportar el plan de un día a PDF o Google Calendar.
- [ ] **Soporte Multi-idioma**: Añadir traducciones al inglés y japonés.
- [ ] **Galería Avanzada**: Filtros dinámicos y organización por álbumes.

---

## 📁 Estructura del Proyecto (Simplificada)

```
Japan-2025-Trip/
├── 📄 astro.config.mjs      # Configuración de Astro (incluye PWA)
├── 📄 tailwind.config.mjs   # Configuración de Tailwind CSS
├── 📂 public/               # Assets estáticos (imágenes, iconos, service workers)
└── 📂 src/
    ├── 📂 components/       # Componentes reutilizables (.astro)
    ├── 📂 data/             # Datos del itinerario (itinerario.json)
    ├── 📂 layouts/          # Plantillas de página
    ├── 📂 pages/            # Rutas y páginas del sitio
    └── 📂 styles/           # Estilos globales
```

---

## 💫 Inspiración

Este proyecto nace de la emoción de planificar un viaje soñado, combinando la pasión por la cultura japonesa y la tecnología web moderna. El objetivo es crear no solo una herramienta útil, sino un recuerdo digital interactivo de la aventura.

<div align="center">

**¿Te gusta el proyecto? ¡Considera darle una estrella! ⭐**

[![GitHub stars](https://img.shields.io/github/stars/NachoSizle/Japan-2025-Trip?style=social)](https://github.com/NachoSizle/Japan-2025-Trip/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/NachoSizle/Japan-2025-Trip?style=social)](https://github.com/NachoSizle/Japan-2025-Trip/network/members)

---

### 🇯🇵 **¡Arigatou gozaimasu!** 🙏

</div>