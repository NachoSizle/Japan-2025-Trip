# 🇯🇵 Japón 2025 Trip Website

<div align="center">

![Torii Gate](https://img.shields.io/badge/⛩️-Torii%20Gate-FF6B6B?style=for-the-badge)
![Travel Dates](https://img.shields.io/badge/📅-14--28%20Agosto%202025-FFB3B3?style=for-the-badge)
![Made with Love](https://img.shields.io/badge/💖-Hecho%20con%20Amor-FF1493?style=for-the-badge)

**Una experiencia web interactiva para documentar y planificar nuestro viaje soñado a Japón**

[🌐 Ver Demo](#) • [📋 Características](#-características) • [🚀 Instalación](#-instalación) • [🛠️ Tecnologías](#️-tecnologías-utilizadas)

</div>

---

## ✨ Características

### 🏠 **Página Principal Épica**
- **Hero Section** con gradientes japoneses y animaciones suaves
- **Timeline Interactivo** con todos los días del viaje
- **Logo Torii** personalizado con efectos de neón
- **Navegación cyberpunk** con hover effects espectaculares

### 📅 **Itinerario Dinámico**
- Navegación día por día (14-28 de Agosto)
- Tarjetas interactivas con actividades planificadas
- Diseño responsivo optimizado para móvil
- Transiciones suaves entre páginas

### 🌾🚫 **Guía Sin Gluten Completa**
- **Apps recomendadas** para encontrar restaurantes sin gluten
- **Lista curada** de restaurantes amigables con celíacos
- **Información práctica** para viajar sin gluten por Japón
- Diseño con gradientes verdes relajantes

### � **Galería de Fotos**
- Vista de cuadrícula responsiva
- Modal con vista ampliada de imágenes
- Efectos de hover suaves
- Optimizada para todas las resoluciones

### 🌙☀️ **Tema Claro/Oscuro**
- **Toggle completamente funcional** entre temas
- **Gradientes adaptativos** que cambian según el tema
- **Colores japoneses** inspirados en la cultura tradicional
- **Persistencia** del tema preferido en localStorage

### 📱 **Diseño Responsivo**
- **Mobile-first** approach
- **Menú hamburguesa** animado para móviles
- **Breakpoints optimizados** para todas las pantallas
- **Touch-friendly** interfaces

---

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/NachoSizle/Japan-2025-Trip.git

# Navegar al directorio
cd Japan-2025-Trip

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:4321` 🎌

---

## 🛠️ Tecnologías Utilizadas

<div align="center">

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| ![Astro](https://img.shields.io/badge/⚡-Astro-FF5A03?style=flat-square) | `5.12.1` | Framework web moderno y rápido |
| ![TypeScript](https://img.shields.io/badge/📘-TypeScript-3178C6?style=flat-square) | `latest` | Tipado estático para JavaScript |
| ![Tailwind](https://img.shields.io/badge/🎨-Tailwind%20CSS-38BDF8?style=flat-square) | `3.4.15` | Framework CSS utility-first |
| ![CSS3](https://img.shields.io/badge/🎭-CSS%20Custom-1572B6?style=flat-square) | `CSS3` | Gradientes y animaciones personalizadas |

</div>

---

## 📁 Estructura del Proyecto

```
Japan-2025-Trip/
├── 📄 astro.config.mjs      # Configuración de Astro
├── 📄 tailwind.config.mjs   # Configuración de Tailwind
├── 📄 package.json          # Dependencias del proyecto
├── 📂 public/               # Recursos estáticos
│   ├── 🎨 favicon.svg       # Icono del sitio
│   └── 📂 assets/           # Imágenes y recursos
├── 📂 src/
│   ├── 📂 components/       # Componentes reutilizables
│   │   ├── 🎫 DayCard.astro         # Tarjetas de días
│   │   ├── 🖼️ Gallery.astro         # Galería de fotos
│   │   ├── 🌾 GlutenFreeGuide.astro # Guía sin gluten
│   │   ├── 📋 Header.astro          # Navegación y tema
│   │   └── ⏰ Timeline.astro        # Timeline del viaje
│   ├── 📂 data/
│   │   └── 📊 itinerario.json      # Datos del itinerario
│   ├── 📂 layouts/
│   │   └── 🏗️ Layout.astro         # Layout base
│   ├── 📂 pages/
│   │   ├── 🏠 index.astro          # Página principal
│   │   └── 📂 itinerario/
│   │       └── 📅 [dia].astro      # Páginas dinámicas por día
│   └── 📂 styles/
│       └── 🎨 global.css           # Estilos globales
└── 📂 docs/                 # Documentación del viaje
```

---

## 🎨 Paleta de Colores

### 🌙 Modo Oscuro (Tema Principal)
```css
🎌 Rojo Japonés: #FF6B6B    /* Torii gates y acentos */
💖 Rosa Neón:    #FF1493    /* Links y navegación */
🌊 Cyan Brillante: #00FFFF   /* Hover effects */
⚫ Negro Profundo: #1A1A1A   /* Backgrounds */
🌟 Púrpura Místico: #2D1B3D  /* Gradientes */
```

### ☀️ Modo Claro (Tema Alternativo)
```css
🌸 Rosa Suave:   #FFEEF7    /* Backgrounds suaves */
💜 Púrpura Real: #8A2BE2    /* Textos principales */
🧡 Naranja Vivo: #FF6600    /* Hover effects */
🤍 Blanco Puro:  #FFFFFF    /* Cards y elementos */
💚 Verde Zen:    #F0FFF0    /* Sección sin gluten */
```

---

## 🧞 Comandos Disponibles

| Comando | Acción |
|---------|--------|
| `npm install` | 📦 Instala las dependencias del proyecto |
| `npm run dev` | 🚀 Inicia servidor de desarrollo en `localhost:4321` |
| `npm run build` | 🏗️ Construye el sitio para producción en `./dist/` |
| `npm run preview` | 👀 Previsualiza la build local antes del deploy |
| `npm run astro ...` | ⚡ Ejecuta comandos CLI de Astro |
| `npm run astro -- --help` | ❓ Obtiene ayuda sobre los comandos de Astro |

---

## 🎯 Funcionalidades Técnicas Destacadas

### ⚡ **Rendimiento Optimizado**
- Static Site Generation (SSG) con Astro
- Lazy loading de imágenes
- CSS y JS minificados
- Componentes con scope CSS automático

### 🎭 **Experiencia de Usuario**
- Transiciones suaves entre páginas
- Loading states y feedback visual
- Gestos touch optimizados para móvil
- Accesibilidad mejorada

### � **Arquitectura Limpia**
- Componentes reutilizables y modulares
- Separación clara de concerns
- TypeScript para mejor mantenibilidad
- Configuración centralizada

---

## 🌟 Próximas Mejoras

- [ ] 🌐 Deploy automático con GitHub Pages
- [ ] 📱 Progressive Web App (PWA)
- [ ] 🗺️ Integración con mapas interactivos
- [ ] 📊 Analytics de visitas y engagement
- [ ] 🔍 Buscador de contenido interno
- [ ] 🌍 Soporte multi-idioma (ES/EN/JP)

---

## 💫 Inspiración y Agradecimientos

Este proyecto está inspirado en la rica cultura japonesa, los hermosos colores de los templos Torii, y la emoción de planificar el viaje de nuestros sueños. 

**Diseñado con 💖 para crear recuerdos inolvidables** 

---

<div align="center">

**¿Te gusta el proyecto? ⭐ ¡Dale una estrella!**

[![GitHub stars](https://img.shields.io/github/stars/NachoSizle/Japan-2025-Trip?style=social)](https://github.com/NachoSizle/Japan-2025-Trip/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/NachoSizle/Japan-2025-Trip?style=social)](https://github.com/NachoSizle/Japan-2025-Trip/network/members)

---

🇯🇵 **¡Arigatou gozaimasu!** 🙏

</div>
