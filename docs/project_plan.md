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

### Fase 2: Contenido e Interactividad (Semana 2) 🔄 EN PROGRESO
- [x] ✅ Procesamiento del PDF del itinerario
- [x] ✅ Componentes del timeline interactivo
- [ ] 🔄 Integración de mapas
- [ ] 🔄 Sistema de filtros

### Fase 3: Características Especiales (Semana 3) 🔄 EN PROGRESO
- [x] ✅ Sección gluten-free completa
- [x] ✅ Galería de imágenes
- [x] ✅ Optimización mobile
- [x] ✅ Animaciones y transiciones

### Fase 4: Deployment y Optimización (Semana 4) 🔄 EN PROGRESO
- [x] ✅ Configuración GitHub Pages
- [ ] 🔄 Optimización de performance
- [ ] 🔄 SEO y meta tags
- [ ] 🔄 Testing en diferentes dispositivos

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
- **Datos del itinerario**: 14 días procesados desde PDF
- **GitHub Pages**: Desplegado y funcionando
- **Navegación responsive**: Header con overflow control
- **Legibilidad optimizada**: Colores ajustados para modo claro
- **Subrayados eliminados**: Implementación súper agresiva exitosa

### 🔄 **En Desarrollo:**
- Integración de mapas interactivos
- Sistema de filtros avanzado
- Optimización final de performance
- SEO y meta tags
- Testing en dispositivos adicionales

### 📊 **Progreso General: 75% Completado**

## 📝 Notas Adicionales
- Revisar PDF del itinerario para extraer datos exactos
- Crear logo/favicon personalizado
- Considerar PWA para uso offline durante el viaje
- Preparar versión imprimible del itinerario