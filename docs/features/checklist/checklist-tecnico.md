# 📋 Requisitos y Prototipo — Checklist Personalizada para el Viaje

Este documento recoge los requisitos funcionales, de UI/UX y el enfoque técnico inicial para la isla SolidJS de la checklist personalizable.

---

## 1. Requisitos Funcionales

- El usuario puede marcar ítems predefinidos como completados (ej: ropa, documentos, dispositivos).
- El usuario puede añadir ítems personalizados a la checklist.
- El usuario puede eliminar ítems personalizados.
- El usuario puede filtrar la checklist por estado: Todos, Completados, Pendientes.
- El usuario puede buscar ítems rápidamente mediante una barra de búsqueda.
- El estado de la checklist (completados, personalizados) se guarda en `localStorage` para persistencia offline y sin autenticación.
- Todo funciona 100% offline y no requiere login.
- Opción de mostrar recordatorios o alertas previas al viaje si hay ítems sin completar.

## 2. Requisitos de UI/UX

- UI minimalista, coherente con el modo claro/oscuro y la estética neón/cyberpunk del proyecto.
- Accesibilidad: navegación por teclado, roles ARIA, contraste adecuado.
- Animaciones sutiles al marcar/desmarcar ítems y al añadir/eliminar.
- Input accesible para añadir nuevos ítems.
- Botón para limpiar la checklist (opcional).
- Sección o botón flotante accesible desde cualquier parte de la app.

## 3. Prototipo de UI (wireframe textual)

```
Ruta: /checklist  ← Página dedicada accesible desde el header principal

Header (con acceso directo a Checklist):

┌──────────────────────────────────────────────────────┐
│ [Inicio] [Itinerario] [Frases] [Checklist] [Guía GF] │
└──────────────────────────────────────────────────────┘


Barra de herramientas fija (sticky) justo debajo del header:

+----------------------------------------------------------+
| [Limpiar]  [Filtro: Todos | Completados | Pendientes]    |
| [🔍 Buscar ítem...]                                       |
+----------------------------------------------------------+

Página Checklist:

+-----------------------------------+
|        Checklist de Viaje         |
+-----------------------------------+
| [ ] Pasaporte                     |
| [x] Cargador móvil                |
| [ ] Tarjeta SIM                   |
| [ ] ...                           |
| [ ] [input nuevo ítem] [Agregar]  |
+-----------------------------------+
```
Notas:
- La checklist es una página propia, no un modal ni botón flotante.
- El acceso es visible y directo desde el header principal (sustituye el enlace de Galería).
- La barra de herramientas con el botón Limpiar está fija (sticky) debajo del header y siempre visible al hacer scroll.
- Los ítems personalizados deben poder eliminarse fácilmente.
- El diseño debe ser responsive y coherente con el resto de la app.

## 4. Consideraciones Técnicas

- El componente principal será `ChecklistSolid.tsx` (SolidJS).
- El wrapper Astro será `ChecklistWrapper.astro`.
- Los ítems predefinidos se almacenan en `src/data/checklist.json`.
- El estado de la checklist se sincroniza con `localStorage`.
- El bundle debe ser lo más pequeño posible.
- Los recordatorios pueden integrarse con notificaciones push si el usuario lo permite.

---

## 5. Ideas y Retos a Discutir

- ¿Cómo estructurar el JSON de ítems predefinidos para facilitar la extensión y traducción?
- ¿Cómo asegurar la accesibilidad y la usabilidad en móviles?
- ¿Cómo mostrar los recordatorios de forma no intrusiva?
- ¿Dónde ubicar la checklist para que sea accesible pero no invasiva?
- ¿Cómo evitar la pérdida accidental de ítems personalizados?

## 6. Próximos pasos
1. Definir la estructura del JSON de ítems predefinidos.
2. Prototipar la UI y la integración como isla SolidJS.
3. Implementar la lógica de persistencia en `localStorage`.
4. Añadir la lógica de recordatorios/alertas.
5. Validar la experiencia de usuario y ajustar según feedback.

---

> Documento vivo. Actualizar según feedback y avances.
