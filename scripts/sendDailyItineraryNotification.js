require('dotenv').config();
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

// Cargar el itinerario
const itinerarioPath = path.join(__dirname, '../src/data/itinerario.json');
const itinerario = JSON.parse(fs.readFileSync(itinerarioPath, 'utf-8'));

// Obtener la fecha actual en Japón
const now = new Date();
const jpDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));

// Buscar el día del itinerario que corresponde a hoy
// Suponiendo que el campo 'fecha' es YYYY-MM-DD o que el campo 'dia' es correlativo
const hoy = itinerario.find(dia => {
  if (dia.fecha) {
    // Si hay campo fecha, comparar con la fecha de Japón
    return dia.fecha === jpDate.toISOString().slice(0, 10);
  }
  // Si no, usar correlativo (ajustar según tu JSON)
  return Number(dia.dia) === jpDate.getDate();
});

if (!hoy) {
  console.log('No hay itinerario para hoy (' + jpDate.toISOString().slice(0, 10) + ')');
  process.exit(0);
}

const titulo = hoy.titulo || `Día ${hoy.dia}`;
const url = `https://nachosizle.github.io/Japan-2025-Trip/itinerario/${hoy.dia}`;

fetch('https://onesignal.com/api/v1/notifications', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${process.env.ONESIGNAL_API_KEY}`
  },
  body: JSON.stringify({
    app_id: process.env.ONESIGNAL_APP_ID,
    included_segments: ['Subscribed Users'],
    headings: { es: titulo },
    contents: { es: 'Consulta el itinerario de hoy en la web.' },
    url
  })
})
  .then(res => res.json())
  .then(data => {
    if (data.errors) {
      console.error('Error al enviar notificación:', data.errors);
      process.exit(1);
    }
    console.log('Notificación enviada:', data);
  })
  .catch(err => {
    console.error('Error de red:', err);
    process.exit(1);
  });
