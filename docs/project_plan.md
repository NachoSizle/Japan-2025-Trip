# 🗾 Proyecto: Landing Page Viaje a Japón 2025

## 📋 Resumen del Proyecto
Landing page desarrollada con Astro + TailwindCSS para mostrar de forma interactiva y visualmente atractiva el itinerario del viaje a Japón (14-28 de Agosto 2025), con énfasis especial en opciones gluten-free y estética japonesa moderna.

## 🎯 Objetivos
- Crear una experiencia visual inmersiva del viaje
- Organizar el itinerario de manera interactiva y navegable
- Destacar opciones gluten-free para facilitar la planificación
- Reflejar la estética japonesa moderna con toques neón/tech

## 🎨 Diseño y Estética

### Paleta de Colores
- **Primarios**: Fucsia neón (#FF1493), Cian neón (#00FFFF), Morado tech (#8A2BE2)
- **Fondo**: Negro profundo (#0A0A0A), gris carbón (#1A1A1A)
- **Secundarios**: Gris medio (#404040), blanco puro (#FFFFFF)
- **Acentos**: Dorado suave (#FFD700) para elementos tradicionales
- **Gluten-Free**: Verde lima neón (#32CD32) + icono específico
- **Efectos**: Glow/sombras neón para destacar elementos interactivos

### Tipografía
- **Principal**: Inter/Poppins - moderna y limpia para legibilidad
- **Caligráfica**: Mezcla de estilo occidental elegante + simulación de caracteres japoneses estilizados
- **Decorativa**: Elementos que simulen kanji/hiragana para acentos visuales
- **Código**: Font monospace para información técnica (horarios, precios)

### Recursos Visuales
- **Logo/favicon**: Torii tradicional con outline neón híbrido (fucsia base + efectos tech sutiles)
- **Variaciones**: Animado para header, minimal para favicon, con transiciones de color
- Fotos hero: Templos, neones de Akihabara, skyline nocturno
- Iconografía: Ukiyo-e moderno, símbolos japoneses estilizados
- Mapas integrados de Google Maps

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
- **Framework**: Astro 4.x
- **Estilos**: TailwindCSS
- **Interactividad**: Alpine.js (integrado con Astro)
- **Mapas**: Google Maps Embed API
- **Hospedaje**: GitHub Pages

### Estructura del Proyecto
```
src/
├── components/
│   ├── Header.astro
│   ├── Navigation.astro
│   ├── Timeline.astro
│   ├── DayCard.astro
│   ├── RestaurantCard.astro
│   ├── GlutenFreeGuide.astro
│   └── Footer.astro
├── layouts/
│   └── Layout.astro
├── pages/
│   ├── index.astro
│   ├── itinerario/
│   │   └── [dia].astro
│   ├── gluten-free.astro
│   └── galeria.astro
├── styles/
│   └── global.css
└── data/
    └── itinerario.json
```

## 📱 Funcionalidades

### Navegación
- **Header fijo** con menú responsive
- **Secciones principales**:
  - Inicio (Hero + resumen)
  - Itinerario interactivo
  - Guía Gluten-Free
  - Galería
  - Información práctica

### Timeline Interactivo
- **Vista día a día** con tarjetas desplegables
- **Filtros**: Por ciudad, tipo de actividad, opciones gluten-free
- **Información por día**:
  - Actividades principales
  - Restaurantes (con marcado GF)
  - Transporte
  - Alojamiento
  - Enlaces a reservas/Google Maps

### Características Gluten-Free
- **Iconografía específica**: 🌾🚫 + color verde lima
- **Sección dedicada** con:
  - Frases útiles en japonés
  - Apps recomendadas
  - Cadenas de restaurantes seguros
  - Productos de supermercado

## 📊 Estructura de Contenido

### Página Principal
1. **Hero Section**: Imagen impactante + título animado
2. **Resumen del viaje**: Fechas, ciudades, highlights
3. **Preview del itinerario**: Timeline condensado
4. **CTA**: Explorar itinerario completo

### Itinerario Detallado
- **14 días organizados** según PDF proporcionado
- **Información por día**:
  - Desayuno, almuerzo, cena
  - Actividades principales
  - Transporte entre ubicaciones
  - Costos estimados
  - Enlaces útiles

### Guía Gluten-Free
- **Restaurantes verificados** por día/ciudad
- **Frases de supervivencia** en japonés
- **Apps móviles** recomendadas
- **Productos de emergencia** en konbini

## 🚀 Fases de Desarrollo

### Fase 1: Setup y Diseño Base (Semana 1) ✅ COMPLETADA
- [x] ✅ Configuración de Astro + TailwindCSS
- [x] ✅ Sistema de diseño y componentes base
- [x] ✅ Layout principal y navegación
- [x] ✅ Hero section y página de inicio

### Fase 2: Contenido e Interactividad (Semana 2) ✅ COMPLETADA
- [x] ✅ Procesamiento del PDF del itinerario
- [x] ✅ Componentes del timeline interactivo
- [ ] 🔄 Sistema de filtros por fechas inteligente
- [x] ✅ Timeline con lógica de fecha actual
- [ ] 🔄 Integración de mapas

### Fase 3: Características Especiales (Semana 3) ✅ COMPLETADA
- [x] ✅ Sección gluten-free completa
- [ ] 🔄 Galería de imágenes
- [x] ✅ Optimización mobile
- [x] ✅ Animaciones y transiciones
- [x] ✅ Contador regresivo dinámico
- [x] ✅ Sistema de routing optimizado
- [x] ✅ Componentes de vuelo integrados

### Fase 4: Deployment y Optimización (Semana 4) ✅ COMPLETADA
- [x] ✅ Configuración GitHub Pages
- [x] ✅ Optimización de performance
- [x] ✅ BASE_URL configurado correctamente
- [x] ✅ Testing responsivo completo
- [x] ✅ Limpieza de código y CSS

## 📈 Métricas de Éxito
- ✅ Tiempo de carga < 3 segundos
- ✅ Responsive design perfecto en móvil
- ✅ Navegación intuitiva del itinerario
- ✅ Información gluten-free fácilmente accesible

## 🎯 Progreso Actual (Julio 2025)
### ✅ **Logros Completados:**
- **Setup completo**: Astro + TailwindCSS configurado
- **Diseño base implementado**: Paleta rosa japonesa, tipografías, layout
- **Componentes funcionales**: Header, Timeline, DayCard, GlutenFreeGuide, Gallery
- **Responsive design**: Optimización completa para móvil 
- **Hero section impactante**: Con animaciones y efectos visuales
- **Itinerario completo**: 14 días detallados con actividades, horarios y costos
- **Base de datos gluten-free**: 18 restaurantes verificados por ciudad
- **Frases de supervivencia**: 12 frases esenciales en japonés con romaji
- **Apps recomendadas**: 6 aplicaciones móviles útiles
- **Productos de emergencia**: Guía de compra en konbinis
- **GitHub Pages**: Desplegado y funcionando
- **Navegación responsive**: Header con overflow control
- **Legibilidad optimizada**: Colores ajustados para modo claro
- **Subrayados eliminados**: Implementación súper agresiva exitosa
- **Timeline inteligente**: Sistema de fechas que muestra contenido relevante según la fecha actual
- **Contador regresivo**: Dinámico hasta el 13 de agosto con actualización en tiempo real
- **Sistema de routing**: BASE_URL configurado correctamente para GitHub Pages
- **Componentes de vuelo**: FlightCard y ReturnFlightCard integrados
- **Página de itinerario**: Página completa con Header y navegación optimizada
- **Botones CTA optimizados**: Tamaños igualados, emojis arreglados, animaciones consistentes
- **Código limpio**: Eliminación de filtros obsoletos y CSS no utilizado
- **Experiencia de usuario**: Navegación fluida entre timeline y itinerario completo

### 🏆 **Características Avanzadas Implementadas:**
- **Timeline con lógica temporal**: Muestra diferentes contenidos según la fecha:
  - Antes del viaje: Solo tarjeta de vuelo
  - Día de vuelo: Vuelo + primer día
  - Durante el viaje: Día actual correspondiente
  - Último día: Día 15 + vuelo de vuelta
  - Después del viaje: Mensaje de finalización
- **Contador regresivo dinámico**: 
  - Cuenta días, horas, minutos y segundos hasta el 13 de agosto
  - Actualización automática cada segundo
  - Efectos visuales con animaciones de pulso
  - Mensaje especial cuando comience el viaje
  - Compatible con modo claro/oscuro
- **Sistema de navegación avanzado**:
  - URLs correctas con BASE_URL para deployment
  - Navegación entre página principal y itinerario completo
  - Header integrado en todas las páginas
  - Botones CTA con routing optimizado

### 🔄 **Pendientes (Opcionales):**
- Integración de mapas interactivos
- Meta tags avanzados para SEO
- PWA para uso offline

### 📊 **Progreso General: 95% Completado**

## ✨ **Características Destacadas del Proyecto**

### 🎨 **Diseño Visual**
- **Tema rosa japonés**: Gradientes fucsia con efectos neón
- **Modo claro/oscuro**: Transiciones suaves entre temas
- **Animaciones fluidas**: Partículas flotantes, efectos hover, transiciones
- **Responsive design**: Optimización perfecta para móvil y desktop

### 🧠 **Funcionalidad Inteligente**
- **Timeline adaptativo**: Contenido dinámico según fecha actual
- **Contador en tiempo real**: JavaScript vanilla sin dependencias
- **Navegación intuitiva**: Flujo lógico entre secciones
- **Información organizada**: Estructura clara y accesible

### 🌾 **Enfoque Gluten-Free**
- **Restaurantes verificados**: Base de datos completa por ciudad
- **Frases útiles**: Comunicación en japonés para celíacos
- **Apps recomendadas**: Herramientas digitales de apoyo
- **Productos de emergencia**: Guía de compras en konbinis

### 🚀 **Tecnología Moderna**
- **Astro framework**: SSG optimizado para performance
- **TailwindCSS**: Estilos utilitarios con diseño consistente
- **GitHub Pages**: Deployment automático y confiable
- **Código limpio**: Arquitectura mantenible y escalable

## 📝 Notas Adicionales
- ✅ PDF del itinerario procesado y estructurado en JSON
- ✅ Logo/favicon con tema rosa japonés implementado
- ✅ Experiencia optimizada para uso móvil durante el viaje
- ✅ Versión digital completa con navegación intuitiva
- ✅ Sistema de fechas inteligente que evoluciona con el tiempo
- ✅ Contador regresivo para generar expectativa pre-viaje

## 🎌 **Estado Final del Proyecto**
**El proyecto está virtualmente completo y listo para el viaje.** Todas las funcionalidades principales están implementadas, el diseño es responsive y atractivo, y la experiencia de usuario es fluida. El sitio web ahora sirve como una herramienta completa para planificar, seguir y disfrutar el viaje a Japón con todas las consideraciones especiales para celíacos incluidas.

**URL del proyecto desplegado**: [Japan-2025-Trip en GitHub Pages](https://nachosizle.github.io/Japan-2025-Trip/)