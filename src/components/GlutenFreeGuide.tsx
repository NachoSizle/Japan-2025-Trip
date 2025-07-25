import { For } from 'solid-js';

const frasesUtiles = [
  {
    japones: "グルテンフリーですか？",
    fonetico: "Guruten furī desu ka?",
    traduccion: "¿Es libre de gluten?"
  },
  {
    japones: "小麦粉が入っていますか？",
    fonetico: "Komugiko ga haitte imasu ka?",
    traduccion: "¿Contiene harina de trigo?"
  },
  {
    japones: "小麦アレルギーがあります",
    fonetico: "Komugi arerugī ga arimasu",
    traduccion: "Tengo alergia al trigo"
  },
  {
    japones: "醤油は大丈夫ですか？",
    fonetico: "Shōyu wa daijōbu desu ka?",
    traduccion: "¿La salsa de soja está bien?"
  }
];

const aplicacionesUtiles = [
  {
    nombre: "Find Me Gluten Free",
    descripcion: "Encuentra restaurantes sin gluten cerca de ti con reseñas de la comunidad celíaca"
  },
  {
    nombre: "Google Translate",
    descripcion: "Imprescindible para comunicar restricciones alimentarias"
  },
  {
    nombre: "Celiac Travel",
    descripcion: "Guía específica para viajeros celíacos con frases en japonés"
  }
];

const restaurantesRecomendados = [
  {
    nombre: "Ain Soph",
    ubicacion: "Tokyo (multiple locations)",
    descripcion: "Cadena de restaurantes veganos con opciones sin gluten claramente marcadas"
  },
  {
    nombre: "T's Restaurant",
    ubicacion: "Tokyo, Osaka",
    descripcion: "Cocina japonesa moderna con menú sin gluten disponible"
  },
  {
    nombre: "Gonpachi",
    ubicacion: "Tokyo",
    descripcion: "Puede acomodar dietas sin gluten con aviso previo"
  }
];

export default function GlutenFreeGuide() {
  return (
    <>
      <section id="gluten-free" class="py-12 sm:py-16 gluten-free-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div class="text-center mb-12">
            <h2 class="text-3xl sm:text-4xl font-bold m-0 mb-3 gluten-free-title">
              🌾 Guía Sin Gluten
            </h2>
            <p class="text-md sm:text-lg lg:text-xl gluten-free-subtitle">
              Recursos esenciales para un viaje celíaco por Japón.
            </p>
          </div>

          {/* Grid de contenido */}
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Frases Útiles */}
            <div class="lg:col-span-1">
              <div class="gluten-free-card h-full p-5 sm:p-6 rounded-xl backdrop-blur-sm">
                <h3 class="text-xl sm:text-2xl font-bold mb-4 gluten-free-phrases-title text-center">
                  🗣️ Frases Esenciales
                </h3>
                <div class="space-y-3">
                  <For each={frasesUtiles}>{(frase, index) => (
                    <div class="gluten-free-phrase-item p-3 rounded-lg border-l-4">
                      <p class="gluten-free-japanese text-lg sm:text-xl font-semibold mb-1">{frase.japones}</p>
                      <p class="gluten-free-phonetic text-sm italic mb-1">{frase.fonetico}</p>
                      <p class="gluten-free-translation text-sm font-medium">{frase.traduccion}</p>
                    </div>
                  )}</For>
                </div>
              </div>
            </div>

            {/* Apps y Restaurantes en una columna */}
            <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Apps Útiles */}
              <div>
                <div class="gluten-free-apps-card h-full p-5 sm:p-6 rounded-xl backdrop-blur-sm">
                  <h3 class="text-xl sm:text-2xl font-bold mb-4 gluten-free-apps-title text-center">
                    📱 Apps Imprescindibles
                  </h3>
                  <div class="space-y-4">
                    <For each={aplicacionesUtiles}>{(app, index) => (
                      <div class="gluten-free-app-item p-3 rounded-lg border-l-4">
                        <h4 class="gluten-free-app-name text-md font-bold mb-1">{app.nombre}</h4>
                        <p class="gluten-free-app-description text-sm">{app.descripcion}</p>
                      </div>
                    )}</For>
                  </div>
                </div>
              </div>

              {/* Restaurantes */}
              <div>
                <div class="gluten-free-restaurants-card h-full p-5 sm:p-6 rounded-xl backdrop-blur-sm">
                  <h3 class="text-xl sm:text-2xl font-bold mb-4 gluten-free-restaurants-title text-center">
                    🍽️ Restaurantes Seguros
                  </h3>
                  <div class="space-y-4">
                    <For each={restaurantesRecomendados}>{(restaurante, index) => (
                      <div class="gluten-free-restaurant-item p-3 rounded-lg border-l-4">
                        <h4 class="gluten-free-restaurant-name text-md font-bold mb-1">{restaurante.nombre}</h4>
                        <p class="gluten-free-restaurant-location text-xs mb-1 opacity-75">📍 {restaurante.ubicacion}</p>
                        <p class="gluten-free-restaurant-description text-sm">{restaurante.descripcion}</p>
                      </div>
                    )}</For>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pro Tips */}
          <div class="mt-8 sm:mt-10">
            <div class="gluten-free-card p-5 sm:p-6 rounded-xl backdrop-blur-sm">
              <h3 class="text-xl sm:text-2xl font-bold mb-4 gluten-free-apps-title text-center">
                💡 Pro Tips para Celíacos en Japón
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div class="gluten-free-pro-tip p-3 rounded-lg border-l-4">
                  <h4 class="font-bold mb-1 gluten-free-restaurants-title">🏪 Konbini</h4>
                  <p class="gluten-free-pro-tip-text">Busca productos marcados con "グルテンフリー". 7-Eleven y FamilyMart suelen tener opciones.</p>
                </div>
                <div class="gluten-free-pro-tip p-3 rounded-lg border-l-4">
                  <h4 class="font-bold mb-1 gluten-free-restaurants-title">🍜 Cuidado con el ramen</h4>
                  <p class="gluten-free-pro-tip-text">La mayoría de caldos llevan trigo. Busca locales especializados en ramen sin gluten.</p>
                </div>
                <div class="gluten-free-pro-tip p-3 rounded-lg border-l-4">
                  <h4 class="font-bold mb-1 gluten-free-restaurants-title">🧑‍🍳 Comunicación</h4>
                  <p class="gluten-free-pro-tip-text">Lleva una tarjeta traducida explicando tu condición. Muchos restaurantes intentarán ayudarte.</p>
                </div>
                <div class="gluten-free-pro-tip p-3 rounded-lg border-l-4">
                  <h4 class="font-bold mb-1 gluten-free-restaurants-title">🍱 Preparación</h4>
                  <p class="gluten-free-pro-tip-text">Lleva siempre snacks sin gluten. No todos los sitios turísticos tendrán opciones.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>
        {`
          /* === GLUTEN FREE GUIDE STYLES === */
          
          /* Sección principal */
          .gluten-free-section {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d3d2b 100%);
            position: relative;
          }
          
          [data-theme="light"] .gluten-free-section {
            background: linear-gradient(135deg, #FFE8E8 0%, #FFDDDD 100%) !important;
          }

          /* Título principal */
          .gluten-free-title {
            background: linear-gradient(135deg, #32CD32, #7CFC00, #98FB98);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 30px rgba(50, 205, 50, 0.5);
          }
          
          [data-theme="light"] .gluten-free-title {
            background: linear-gradient(135deg, #32CD32, #7CFC00, #98FB98) !important;
            -webkit-background-clip: text !important;
            background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            text-shadow: 0 0 20px rgba(50, 205, 50, 0.3) !important;
          }

          /* Subtítulo */
          .gluten-free-subtitle {
            color: rgba(255, 255, 255, 0.8);
          }
          
          [data-theme="light"] .gluten-free-subtitle {
            color: #2D1B1B !important;
            font-weight: 600;
            opacity: 0.95;
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3);
          }

          /* Títulos de secciones */
          .gluten-free-phrases-title,
          .gluten-free-apps-title,
          .gluten-free-restaurants-title {
            color: #32CD32;
          }

          /* Tarjetas principales */
          .gluten-free-card,
          .gluten-free-apps-card,
          .gluten-free-restaurants-card {
            background: rgba(26, 26, 26, 0.7);
            border: 1px solid rgba(50, 205, 50, 0.3);
            transition: all 0.3s ease;
          }
          
          .gluten-free-card:hover,
          .gluten-free-apps-card:hover,
          .gluten-free-restaurants-card:hover {
            border-color: rgba(50, 205, 50, 0.5);
            box-shadow: 0 8px 32px rgba(50, 205, 50, 0.2);
          }
          
          [data-theme="light"] .gluten-free-card,
          [data-theme="light"] .gluten-free-apps-card,
          [data-theme="light"] .gluten-free-restaurants-card {
            background: rgba(255, 245, 245, 0.9);
            border: 2px solid rgba(50, 205, 50, 0.3);
            box-shadow: 0 4px 20px rgba(50, 205, 50, 0.1);
          }
          
          [data-theme="light"] .gluten-free-card:hover,
          [data-theme="light"] .gluten-free-apps-card:hover,
          [data-theme="light"] .gluten-free-restaurants-card:hover {
            background: rgba(50, 205, 50, 0.1);
            border-color: rgba(50, 205, 50, 0.5);
          }

          /* Elementos de frases */
          .gluten-free-phrase-item,
          .gluten-free-app-item,
          .gluten-free-restaurant-item,
          .gluten-free-pro-tip {
            background: rgba(50, 205, 50, 0.05);
            border-left-color: #32CD32;
          }
          
          [data-theme="light"] .gluten-free-phrase-item,
          [data-theme="light"] .gluten-free-app-item,
          [data-theme="light"] .gluten-free-restaurant-item,
          [data-theme="light"] .gluten-free-pro-tip {
            background: rgba(50, 205, 50, 0.03);
            border-left-color: #32CD32;
          }

          .gluten-free-japanese {
            color: #7CFC00;
          }

          .gluten-free-phonetic {
            color: rgba(255, 255, 255, 0.7);
          }
          
          [data-theme="light"] .gluten-free-phonetic {
            color: #4b5563 !important;
            font-weight: 500;
          }

          .gluten-free-translation {
            color: rgba(255, 255, 255, 0.9);
          }
          
          [data-theme="light"] .gluten-free-translation {
            color: #1a1a1a !important;
            font-weight: 500;
          }

          /* Elementos de apps */
          .gluten-free-app-name,
          .gluten-free-restaurant-name {
            color: #7CFC00;
          }

          .gluten-free-app-description,
          .gluten-free-restaurant-description,
          .gluten-free-restaurant-location {
            color: rgba(255, 255, 255, 0.9);
          }
          
          [data-theme="light"] .gluten-free-app-description,
          [data-theme="light"] .gluten-free-restaurant-description,
          [data-theme="light"] .gluten-free-restaurant-location {
            color: #2d2d2d !important;
            font-weight: 500;
          }

          /* Pro tips */
          .gluten-free-pro-tip-text {
            color: rgba(255, 255, 255, 0.95);
          }
          
          [data-theme="light"] .gluten-free-pro-tip-text {
            color: #1a1a1a !important;
            font-weight: 500;
          }
        `}
      </style>
    </>
  );
}
