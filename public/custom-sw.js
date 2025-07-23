// custom-sw.js
// Service Worker personalizado para manejar eventos push
self.addEventListener('push', function(event) {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }
  const title = data.title || '¡Notificación de Japan Trip!';
  const options = {
    body: data.body || 'Tienes una nueva notificación.',
    icon: 'icons/icon-192x192.png',
    badge: 'icons/icon-192x192.png',
    data: data.url || '/'
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data)
  );
});
