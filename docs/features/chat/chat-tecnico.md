# 📑 Análisis Técnico — Chat contextual “Pregúntale a tu Itinerario”

Este documento detalla el análisis y definición técnica para la implementación del chat contextual basado en el itinerario de viaje.

---

## 1. Objetivo Técnico

Desarrollar una isla SolidJS que permita a los usuarios realizar preguntas en lenguaje natural sobre el viaje, obteniendo respuestas contextuales a partir del JSON `src/data/itinerario.json`, sin depender de servicios externos y garantizando la privacidad.

## 2. Opciones de Stack/Modelo Local

### a) transformers.js
- **Ventajas:**
  - Permite ejecutar modelos ligeros de lenguaje (BERT, DistilBERT, etc.) en el navegador.
  - 100% local, sin enviar datos fuera.
  - Comunidad activa y ejemplos de QA sobre JSON.
- **Desventajas:**
  - Modelos grandes pueden ser lentos o pesados para móviles.
  - Limitaciones de memoria y tamaño de modelo.

### b) llama.cpp (WebAssembly)
- **Ventajas:**
  - Permite cargar modelos Llama/llama2/llama3 en el navegador vía WASM.
  - Mejor rendimiento que JS puro para modelos pequeños.
- **Desventajas:**
  - Integración más compleja.
  - Modelos aún limitados en tamaño para web.

### c) Algoritmo propio + embeddings (tipo BM25, MiniLM, etc.)
- **Ventajas:**
  - Máxima velocidad y control.
  - Indexación optimizada para preguntas frecuentes.
- **Desventajas:**
  - Menos flexible para preguntas abiertas.

## 3. Flujo de Datos

- El JSON se carga en la isla React al inicializar el componente.
- Se preprocesa para indexar días, actividades, alojamientos, vuelos, etc.
- Al recibir una pregunta, se genera un embedding/vector o se busca por keywords.
- El modelo local genera la respuesta o selecciona el fragmento más relevante.

## 4. Estrategia de Integración (Astro + SolidJS)

- El chat será un componente SolidJS en `src/components/ChatItinerarioSolid.tsx`.
- Wrapper `.astro` en `src/components/ChatItinerarioWrapper.astro` con `client:visible`.
- El JSON se pasa como prop o se importa directamente en el componente.
- UI minimalista, con soporte para modo claro/oscuro y accesibilidad.

## 5. Consideraciones de UI/UX y Accesibilidad (SolidJS)

- Input de texto con botón de enviar y scroll para el historial.
- Respuestas claras, en español y tono amigable.
- Accesible vía teclado y screen readers.
- Animaciones sutiles, sin distraer de la navegación principal.

## 6. Limitaciones, Riesgos y Alternativas (SolidJS)

- **Limitaciones:**
  - Modelos grandes pueden no ser viables en móviles antiguos.
  - Respuestas limitadas por la calidad del modelo local.
- **Riesgos:**
  - UX lenta si el modelo es pesado.
  - Complejidad de integración de modelos WASM.
- **Alternativas:**
  - Fallback a búsqueda por keywords si el modelo no responde.
  - Permitir elegir entre varios modos de respuesta (rápido vs. completo).

---

## Referencias
- [transformers.js](https://xenova.github.io/transformers.js/)
- [llama.cpp WASM](https://github.com/ggerganov/llama.cpp/tree/master/examples/wasm)
- [Ejemplo de QA sobre JSON](https://huggingface.co/spaces/xenova/json-qa)
- [SolidJS Docs](https://www.solidjs.com/docs)

---

> Documento generado para discusión y validación previa a la implementación.
