import { For } from 'solid-js';

const frasesDestacadas = [
  {
    japones: "こんにちは",
    fonetico: "Konnichiwa",
    traduccion: "Hola (durante el día)",
    categoria: "Básico"
  },
  {
    japones: "ありがとうございます",
    fonetico: "Arigatou gozaimasu",
    traduccion: "Muchas gracias",
    categoria: "Cortesía"
  },
  {
    japones: "...はどこですか？",
    fonetico: "...wa doko desu ka?",
    traduccion: "¿Dónde está...?",
    categoria: "Navegación"
  },
  {
    japones: "これをください",
    fonetico: "Kore wo kudasai",
    traduccion: "Esto, por favor",
    categoria: "Restaurante"
  },
  {
    japones: "いくらですか？",
    fonetico: "Ikura desu ka?",
    traduccion: "¿Cuánto cuesta?",
    categoria: "Compras"
  },
  {
    japones: "助けてください",
    fonetico: "Tasukete kudasai",
    traduccion: "¡Ayúdenme!",
    categoria: "Emergencia"
  }
];

export default function PhrasesPreview() {
  return (
    <>
      <section id="frases-preview" class="py-12 phrases-preview-section">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 m-0">
          {/* Header */}
          <div class="text-center mb-12 sm:mb-16">
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold m-0 mb-4 phrases-preview-title">
              🗣️ Frases Esenciales
            </h2>
            <p class="text-lg sm:text-xl lg:text-2xl mb-6 phrases-preview-subtitle">
              Aprende las frases más importantes para desenvolverte en Japón
            </p>
            <div class="flex justify-center">
              <a href={`${import.meta.env.BASE_URL}frases`} class="phrases-preview-cta group">
                <span class="group-hover:animate-pulse">📚 Ver Todas las Frases</span>
                <span class="phrases-preview-arrow">→</span>
              </a>
            </div>
          </div>

          {/* Grid de frases destacadas */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <For each={frasesDestacadas}>{(frase, index) => (
              <div class="phrases-preview-card" data-aos="fade-up" data-aos-delay={index() * 100}>
                <div class="phrases-preview-category">
                  {frase.categoria}
                </div>
                <div class="phrases-preview-japanese">
                  {frase.japones}
                </div>
                <div class="phrases-preview-phonetic">
                  {frase.fonetico}
                </div>
                <div class="phrases-preview-translation">
                  {frase.traduccion}
                </div>
              </div>
            )}</For>
          </div>

          {/* Stats rápidas */}
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div class="phrases-preview-stat">
              <div class="phrases-preview-stat-number">60+</div>
              <div class="phrases-preview-stat-label">Frases útiles</div>
            </div>
            <div class="phrases-preview-stat">
              <div class="phrases-preview-stat-number">8</div>
              <div class="phrases-preview-stat-label">Categorías</div>
            </div>
            <div class="phrases-preview-stat">
              <div class="phrases-preview-stat-number">100%</div>
              <div class="phrases-preview-stat-label">Con fonética</div>
            </div>
            <div class="phrases-preview-stat">
              <div class="phrases-preview-stat-number">📱</div>
              <div class="phrases-preview-stat-label">Fácil acceso</div>
            </div>
          </div>

          {/* Información adicional */}
          <div class="mt-12 text-center">
            <div class="phrases-preview-info">
              <h3 class="phrases-preview-info-title">
                ¿Por qué son importantes estas frases?
              </h3>
              <p class="phrases-preview-info-text">
                Japón es un país increíblemente acogedor, pero el idioma puede ser una barrera. 
                Con estas frases básicas podrás comunicarte para situaciones esenciales como pedir direcciones, 
                ordenar comida, hacer compras y manejar emergencias. ¡La mayoría de japoneses apreciarán enormemente tu esfuerzo!
              </p>
            </div>
          </div>
        </div>
      </section>
      <style>
        {`
          /* === SECCIÓN PREVIEW DE FRASES === */
          
          .phrases-preview-section {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d1a2d 100%);
            position: relative;
          }
          
          [data-theme="light"] .phrases-preview-section {
            background: linear-gradient(135deg, #FFE8E8 0%, #FFDDDD 100%) !important;
          }

          /* Títulos */
          .phrases-preview-title {
            background: linear-gradient(135deg, #FF1493, #FFD700, #32CD32);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 30px rgba(255, 20, 147, 0.5);
          }

          .phrases-preview-subtitle {
            color: rgba(255, 255, 255, 0.8);
          }
          
          [data-theme="light"] .phrases-preview-subtitle {
            color: #2D1B1B !important;
            font-weight: 600;
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3);
          }

          /* CTA Button */
          .phrases-preview-cta {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem 2rem;
            background: linear-gradient(45deg, #FF1493, #FF6B6B);
            color: white;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1.125rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 20, 147, 0.3);
          }
          
          .phrases-preview-cta:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 8px 25px rgba(255, 20, 147, 0.5);
            text-decoration: none;
          }
          
          [data-theme="light"] .phrases-preview-cta {
            background: linear-gradient(45deg, #DC143C, #B22222) !important;
          }

          .phrases-preview-arrow {
            transition: transform 0.3s ease;
          }
          
          .phrases-preview-cta:hover .phrases-preview-arrow {
            transform: translateX(4px);
          }

          /* Cards de frases */
          .phrases-preview-card {
            background: rgba(26, 26, 26, 0.8);
            border: 1px solid rgba(255, 20, 147, 0.3);
            border-radius: 16px;
            padding: 1.5rem;
            text-align: center;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .phrases-preview-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #FF1493, #FFD700, #32CD32);
          }
          
          .phrases-preview-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 32px rgba(255, 20, 147, 0.3);
            border-color: rgba(255, 20, 147, 0.5);
          }
          
          [data-theme="light"] .phrases-preview-card {
            background: rgba(255, 250, 250, 0.9) !important;
            border: 2px solid rgba(255, 107, 107, 0.3) !important;
            box-shadow: 0 4px 20px rgba(255, 20, 147, 0.1);
          }
          
          [data-theme="light"] .phrases-preview-card:hover {
            background: rgba(255, 245, 245, 0.95) !important;
            border-color: rgba(255, 20, 147, 0.5) !important;
            box-shadow: 0 8px 32px rgba(255, 20, 147, 0.2) !important;
          }

          .phrases-preview-category {
            font-size: 0.75rem;
            font-weight: 600;
            color: #FFD700;
            background: rgba(255, 215, 0, 0.1);
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            margin-bottom: 1rem;
            display: inline-block;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .phrases-preview-japanese {
            font-size: 1.5rem;
            font-weight: bold;
            color: #FF1493;
            margin-bottom: 0.75rem;
          }

          .phrases-preview-phonetic {
            font-size: 1rem;
            font-style: italic;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 0.5rem;
          }
          
          [data-theme="light"] .phrases-preview-phonetic {
            color: #6b7280 !important;
            font-weight: 500;
          }

          .phrases-preview-translation {
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 500;
          }
          
          [data-theme="light"] .phrases-preview-translation {
            color: #1f2937 !important;
            font-weight: 600;
          }

          /* Stats */
          .phrases-preview-stat {
            text-align: center;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
          }
          
          .phrases-preview-stat:hover {
            transform: translateY(-2px);
            background: rgba(255, 255, 255, 0.08);
          }
          
          [data-theme="light"] .phrases-preview-stat {
            background: rgba(255, 255, 255, 0.7) !important;
            border: 2px solid rgba(255, 107, 107, 0.2) !important;
          }
          
          [data-theme="light"] .phrases-preview-stat:hover {
            background: rgba(255, 255, 255, 0.9) !important;
          }

          .phrases-preview-stat-number {
            font-size: 1.5rem;
            font-weight: bold;
            color: #32CD32;
            margin-bottom: 0.25rem;
          }

          .phrases-preview-stat-label {
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.8);
          }
          
          [data-theme="light"] .phrases-preview-stat-label {
            color: #4b5563 !important;
            font-weight: 500;
          }

          /* Información adicional */
          .phrases-preview-info {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 215, 0, 0.3);
            border-radius: 16px;
            padding: 2rem;
            max-width: 4xl;
            margin: 0 auto;
          }
          
          [data-theme="light"] .phrases-preview-info {
            background: rgba(255, 255, 255, 0.8) !important;
            border: 2px solid rgba(255, 215, 0, 0.4) !important;
          }

          .phrases-preview-info-title {
            font-size: 1.25rem;
            font-weight: bold;
            color: #FFD700;
            margin-bottom: 1rem;
          }

          .phrases-preview-info-text {
            color: rgba(255, 255, 255, 0.9);
            line-height: 1.6;
            font-size: 1rem;
          }
          
          [data-theme="light"] .phrases-preview-info-text {
            color: #374151 !important;
            font-weight: 500;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .phrases-preview-title {
              font-size: 2.5rem;
            }
            
            .phrases-preview-japanese {
              font-size: 1.25rem;
            }
            
            .phrases-preview-cta {
              font-size: 1rem;
              padding: 0.875rem 1.5rem;
            }
          }
        `}
      </style>
    </>
  );
}
