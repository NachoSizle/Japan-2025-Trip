import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

// Cargar variables de entorno si existe .env (solo local, Actions ya las tiene)
if (fs.existsSync('.env')) {
  const dotenv = await import('dotenv');
  dotenv.config();
}

// __dirname equivalente en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FECHA DE PRUEBA: Simular que es el 15 de agosto de 2025 (primer día del viaje)
const targetDate = new Date('2025-08-15');

const ONESIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID;
const ONESIGNAL_API_KEY = process.env.ONESIGNAL_API_KEY;

if (!ONESIGNAL_APP_ID || !ONESIGNAL_API_KEY) {
  console.error('Faltan las variables de entorno ONESIGNAL_APP_ID o ONESIGNAL_API_KEY.');
  process.exit(1);
}

const itineraryPath = path.join(__dirname, '../src/data/itinerario.json');
const itineraryData = JSON.parse(fs.readFileSync(itineraryPath, 'utf-8'));
const itinerary = itineraryData.dias; // Acceder al array de días

// Buscar el día correspondiente
const todayStr = targetDate.toISOString().split('T')[0];
console.log(`📅 Buscando itinerario para la fecha: ${todayStr}`);

const todayItem = itinerary.find((item) => item.fecha === todayStr);

if (!todayItem) {
  console.error(`❌ No se encontró itinerario para la fecha ${todayStr}`);
  console.log(`📋 Fechas disponibles en el itinerario:`);
  itinerary.forEach((day, index) => {
    console.log(`   Día ${index + 1}: ${day.fecha} - ${day.titulo}`);
  });
  process.exit(1);
}

console.log(`✅ Encontrado: Día ${todayItem.dia} - ${todayItem.titulo}`);

const notification = {
  app_id: ONESIGNAL_APP_ID,
  included_segments: ['All'],
  headings: { es: todayItem.titulo, en: todayItem.titulo },
  contents: { es: todayItem.descripcion || todayItem.titulo, en: todayItem.descripcion || todayItem.titulo },
  url: `https://nachosizle.github.io/Japan-2025-Trip/itinerario/${todayItem.dia}`,
};

console.log(`🔔 Preparando notificación:`);
console.log(`   Título: ${todayItem.titulo}`);
console.log(`   Contenido: ${todayItem.descripcion || todayItem.titulo}`);
console.log(`   URL: https://nachosizle.github.io/Japan-2025-Trip/itinerario/${todayItem.dia}`);

const data = JSON.stringify(notification);

const options = {
  hostname: 'onesignal.com',
  port: 443,
  path: '/api/v1/notifications',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: `Basic ${ONESIGNAL_API_KEY}`,
  },
};

const req = https.request(options, (res) => {
  let response = '';
  res.on('data', (chunk) => {
    response += chunk;
  });
  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 201) {
      console.log('🎉 Notificación enviada correctamente:', response);
    } else {
      console.error('❌ Error al enviar la notificación:', res.statusCode, response);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error en la petición:', error);
  process.exit(1);
});

req.write(data);
req.end();
