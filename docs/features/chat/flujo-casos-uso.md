# 🧭 Flujo de Usuario y Casos de Uso — Chat contextual “Pregúntale a tu Itinerario”

Este documento describe el flujo de usuario y los principales casos de uso para la funcionalidad del chat contextual.

---

## 1. Flujo de Usuario (User Journey)

1. El usuario accede a la web y ve el icono o acceso al chat contextual.
2. El usuario abre el chat (si está minimizado).
3. El usuario escribe una pregunta sobre el viaje en el input del chat.
4. El sistema muestra un estado de "pensando" o animación de carga.
5. El chat responde con información relevante extraída del itinerario.
6. El usuario puede seguir preguntando, limpiar el historial o minimizar el chat.
7. El usuario puede cerrar el chat y volver a abrirlo sin perder el historial (opcional: persistencia local).

## 2. Casos de Uso Principales

### CU1: Consulta de alojamiento
- **Actor:** Usuario
- **Descripción:** El usuario pregunta dónde se aloja un día concreto.
- **Ejemplo:** “¿Dónde dormimos el día 15?”
- **Respuesta esperada:** El chat responde con el alojamiento correspondiente a ese día.

### CU2: Consulta de actividades
- **Actor:** Usuario
- **Descripción:** El usuario pregunta qué actividades hay programadas para un día o lugar.
- **Ejemplo:** “¿Qué actividades hay cerca de Akihabara?”
- **Respuesta esperada:** El chat lista las actividades relevantes.

### CU3: Consulta de vuelos
- **Actor:** Usuario
- **Descripción:** El usuario pregunta por detalles de vuelos.
- **Ejemplo:** “¿A qué hora sale el vuelo a Tokio?”
- **Respuesta esperada:** El chat responde con la hora y detalles del vuelo.

### CU4: Pregunta ambigua o fuera de contexto
- **Actor:** Usuario
- **Descripción:** El usuario hace una pregunta que no se puede responder con el itinerario.
- **Ejemplo:** “¿Cuál es la mejor época para viajar a Japón?”
- **Respuesta esperada:** El chat indica que solo puede responder sobre el viaje planificado y sugiere ejemplos de preguntas válidas.

### CU5: Limpiar historial
- **Actor:** Usuario
- **Descripción:** El usuario pulsa el botón de limpiar y el historial de mensajes se borra.

### CU6: Minimizar/expandir chat
- **Actor:** Usuario
- **Descripción:** El usuario minimiza o expande el chat según su preferencia.

---

> Documento vivo. Añadir más casos según feedback y pruebas.
