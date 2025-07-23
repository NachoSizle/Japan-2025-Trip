# 📍 Roadmap del Proyecto: Japan 2025 Trip

Este roadmap resume las tareas completadas y el progreso funcional del sitio web basado en Astro, tal como fue implementado hasta julio 2025.

---

## ✅ Semana 1: Setup y Diseño Base
- Configuración del entorno con Astro + TailwindCSS
- Definición del sistema de diseño y estructura de componentes
- Creación del layout base con navegación responsive
- Desarrollo de la Hero Section animada
- Diseño inicial adaptado al tema japonés neón

---

## ✅ Semana 2: Contenido e Interactividad
- Procesamiento y transformación del PDF del itinerario a JSON
- Implementación del Timeline interactivo
- Lógica temporal en el Timeline según la fecha actual
- Componentes `DayCard` y `FlightCard` funcionales
- Contador regresivo dinámico funcionando con actualización por segundo

---

## ✅ Semana 3: Características Especiales
- Sección “Guía Gluten-Free” completa
- Iconografía personalizada (🌾🚫)
- Listado de restaurantes gluten-free por ciudad
- Frases útiles para celíacos en japonés
- Apps móviles recomendadas y guía de konbinis
- Animaciones, transiciones y mejoras responsive
- Optimización mobile

---

## ✅ Semana 4: Deployment y Optimización
- Despliegue en GitHub Pages con `BASE_URL` configurado
- Limpieza de código y eliminación de estilos obsoletos
- Pruebas responsive en móviles y tablets
- Navegación fluida entre páginas e itinerario completo
- Botones CTA con rutas optimizadas

---

## 🏆 Características Avanzadas Implementadas
- Sistema inteligente de Timeline según fecha:
  - Previa al viaje: solo vuelo
  - Día de salida: vuelo + día 1
  - Durante el viaje: día correspondiente
  - Último día y post-viaje: cierre adecuado
- Contador regresivo en tiempo real
- Routing optimizado y navegación coherente
- Base de datos gluten-free integrada
- Hero visual impactante
- Animaciones de partículas y hover

---

## 🔄 Pendientes / Mejoras Futuras
- [ ] Galería de imágenes (filtro dinámico)
- [ ] Sistema de filtros por ciudad / tipo de actividad en el itinerario
- [ ] Integración de mapas interactivos (Google Maps Embed API)
- [ ] Meta tags avanzados para SEO
- [x] PWA para uso offline ✅
- [ ] Sistema de feedback de usuarios (comentarios/valoraciones sobre restaurantes y actividades)
- [ ] Exportar itinerario a PDF o Google Calendar
- [ ] Modo oscuro/claro automático y manual
- [ ] Widget de clima en tiempo real por ciudad
- [ ] Integración con redes sociales para compartir itinerario, frases o guía gluten-free
- [ ] Notificaciones push para recordatorios de actividades importantes (requiere PWA)
- [ ] Sección de preguntas frecuentes (FAQ)
- [ ] Historial de viajes y consulta de itinerarios pasados
- [ ] Integración con APIs de transporte japonés (horarios, rutas, alertas)
- [ ] Gamificación: logros, puntos o insignias por completar actividades
- [ ] Soporte multilenguaje (inglés y japonés)

---

Progreso general: **✅ 95% Completado**

---


## ✅ PWA implementada

La app ahora es una PWA completa: permite uso offline, instalación en dispositivos y carga rápida. Se han seguido todos los pasos técnicos recomendados, incluyendo:
- Instalación y configuración de @vite-pwa/astro
- Manifest y assets correctamente enlazados con BASE_URL
- Iconos en `/public/icons/` (192x192 y 512x512)
- Página offline personalizada
- Service Worker funcional y rutas cacheadas
- Pruebas en Chrome DevTools y Lighthouse

¡La funcionalidad PWA está lista y probada!