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

// Permitir pasar la fecha por argumento (formato YYYY-MM-DD)
const args = process.argv.slice(2);
let targetDate = new Date();
const dateArgIndex = args.findIndex((a) => a === '--date');
if (dateArgIndex !== -1 && args[dateArgIndex + 1]) {
  targetDate = new Date(args[dateArgIndex + 1]);
}

const ONESIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID;
const ONESIGNAL_API_KEY = process.env.ONESIGNAL_API_KEY;

if (!ONESIGNAL_APP_ID || !ONESIGNAL_API_KEY) {
  console.error('Faltan las variables de entorno ONESIGNAL_APP_ID o ONESIGNAL_API_KEY.');
  process.exit(1);
}

const itineraryPath = path.join(__dirname, '../src/data/itinerario.json');
const itinerary = JSON.parse(fs.readFileSync(itineraryPath, 'utf-8'));

// Buscar el día correspondiente
const todayStr = targetDate.toISOString().split('T')[0];
const todayItem = itinerary.find((item) => item.fecha === todayStr);

if (!todayItem) {
  console.error(`No se encontró itinerario para la fecha ${todayStr}`);
  process.exit(1);
}

const notification = {
  app_id: ONESIGNAL_APP_ID,
  included_segments: ['All'],
  headings: { es: todayItem.titulo, en: todayItem.titulo },
  contents: { es: todayItem.descripcion || todayItem.titulo, en: todayItem.descripcion || todayItem.titulo },
  url: `https://nachosizle.github.io/Japan-2025-Trip/itinerario/${todayItem.dia}`,
};

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
      console.log('Notificación enviada correctamente:', response);
    } else {
      console.error('Error al enviar la notificación:', res.statusCode, response);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('Error en la petición:', error);
  process.exit(1);
});

req.write(data);
req.end();
