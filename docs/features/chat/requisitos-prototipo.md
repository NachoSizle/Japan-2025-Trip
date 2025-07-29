# 📋 Requisitos y Prototipo — Chat contextual “Pregúntale a tu Itinerario”

Este documento recoge los requisitos funcionales, de UI/UX y el prototipo inicial para la isla SolidJS del chat contextual.

---

## 1. Requisitos Funcionales

- El usuario puede escribir preguntas en español sobre cualquier aspecto del viaje (días, actividades, alojamientos, vuelos, etc.).
- El chat responde en español, de forma clara y amigable, usando solo la información de `src/content/itinerario/itinerario.json`.
- El sistema debe funcionar 100% offline y no enviar datos fuera del dispositivo.
- El historial de conversación se mantiene durante la sesión (opcional: persistencia local).
- El usuario puede limpiar el historial.
- El chat debe manejar preguntas ambiguas con respuestas útiles o sugerencias.
- El sistema debe ser rápido y usable en móviles.
- El chat debe de ser accesible en todo momento (visible, minimizable, etc.).

## 2. Requisitos de UI/UX

- El chat debe estar accesible en todo momento mediante un botón flotante fijo en la pantalla (esquina inferior derecha por defecto).
- El botón flotante debe tener buen contraste, ser accesible vía teclado y screen readers, y mostrar un icono representativo (ej: burbuja de chat).
- Al pulsar el botón, se despliega el chat como modal o panel lateral, superpuesto sobre la app, sin perder el historial.
- El chat puede minimizarse/expandirse y siempre es accesible vía teclado y screen readers.
- Input de texto accesible, con botón de enviar.
- Historial de mensajes con scroll, agrupando usuario y bot.
- Diseño minimalista, coherente con el modo claro/oscuro y la estética neón/cyberpunk.
- Accesibilidad: navegación por teclado, roles ARIA, contraste adecuado.
- Animaciones sutiles (entrada de mensajes, loading, etc.).
- Botón para limpiar el chat.
- Opción de minimizar/expandir el chat.

## 3. Prototipo de UI (wireframe textual)

```
   [🟣]  ← Botón flotante (esquina inferior derecha, siempre visible)

Al pulsar:

+-----------------------------------+
|  Pregúntale a tu Itinerario   [X] |
+-----------------------------------+
| [Historial de mensajes]           |
|                                   |
| Usuario: ¿Dónde dormimos el día 15?   |
| Bot: El 15 de agosto el alojamiento es... |
| ...                               |
+-----------------------------------+
| [input de texto] [Enviar]         |
+-----------------------------------+
| [Limpiar] [Minimizar]             |
+-----------------------------------+
```
Notas:
- El botón flotante debe ser accesible y tener aria-label.
- El panel/modal debe poder cerrarse con [X], tecla ESC o volver a minimizar.

## 4. Consideraciones Técnicas

- El componente principal será `ChatItinerarioSolid.tsx`.
- El wrapper Astro será `ChatItinerarioWrapper.astro`.
- El JSON se importa o pasa como prop.
- El modelo/algoritmo se carga asíncronamente para optimizar el rendimiento.
- El bundle debe ser lo más pequeño posible.

---

> Documento vivo. Actualizar según feedback y avances.
