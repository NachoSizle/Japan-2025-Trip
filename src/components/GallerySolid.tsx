import { createSignal, For, Show } from 'solid-js';
import type { Component } from 'solid-js';

// Definición de la interfaz para una imagen
interface Image {
  id: number;
  src: string;
  alt: string;
  category: string;
  location: string;
  day?: number;
}

// Definición de la interfaz para una categoría
interface Category {
  id: string;
  name: string;
  color: string;
}

// Props que el componente recibirá desde Astro
interface Props {
  images: Image[];
  categories: Category[];
}

const GallerySolid: Component<Props> = (props) => {
  // Estado para la categoría activa y la imagen seleccionada en el modal
  const [activeCategory, setActiveCategory] = createSignal('todos');
  const [selectedImage, setSelectedImage] = createSignal<Image | null>(null);

  // Función para obtener las imágenes filtradas según la categoría activa
  const filteredImages = () => {
    if (activeCategory() === 'todos') {
      return props.images;
    }
    return props.images.filter(image => image.category === activeCategory());
  };

  return (
    <section id="galeria" class="py-12 sm:py-16 md:py-20 gallery-section">
      <div class="container mx-auto px-4">
        <div class="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold font-poppins mb-4 sm:mb-6 gallery-title">
            📸 Galería
          </h2>
          <p class="text-lg sm:text-xl gallery-subtitle max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Momentos únicos de nuestra aventura japonesa, desde templos milenarios hasta neones futuristas.
          </p>
        </div>

        <div class="gallery-container">
          {/* Filtros de categoría renderizados con SolidJS */}
          <div class="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2">
            <For each={props.categories}>{(category) =>
              <button 
                onClick={() => setActiveCategory(category.id)}
                class={`px-3 sm:px-4 py-2 border-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap filter-inactive-${category.color}`}
                classList={{
                  [`filter-active-${category.color}`]: activeCategory() === category.id
                }}
              >
                {category.name}
              </button>
            }</For>
          </div>

          {/* Grid de la galería renderizado con SolidJS */}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            <For each={filteredImages()}>{(image) =>
              <div 
                class="group relative aspect-square overflow-hidden rounded-xl gallery-card transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(image)}>
                <img 
                  src={image.src} 
                  alt={image.alt}
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div class="gallery-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div class="absolute bottom-0 left-0 right-0 p-3 sm:p-4 gallery-overlay-text">
                    <h3 class="font-semibold text-sm sm:text-base mb-1 break-words">{image.alt}</h3>
                    <p class="text-xs sm:text-sm gallery-overlay-location break-words">📍 {image.location}</p>
                    <Show when={image.day}>
                      <p class="text-xs gallery-overlay-day mt-1">Día {image.day}</p>
                    </Show>
                  </div>
                  <div class="gallery-expand-icon absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center">
                    <span class="text-lg">🔍</span>
                  </div>
                </div>
              </div>
            }</For>
          </div>

          {/* Modal para la imagen ampliada */}
          <Show when={selectedImage()}>
            <div 
              class="fixed inset-0 z-50 flex items-center justify-center p-4 gallery-modal bg-bg-deep-black/80 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <div class="relative max-w-4xl max-h-full w-full" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setSelectedImage(null)}
                  class="gallery-modal-close absolute top-2 right-2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300">
                  <span class="text-xl">✕</span>
                </button>
                <div class="gallery-modal-content rounded-xl overflow-hidden flex flex-col">
                  <img 
                    src={selectedImage()?.src}
                    alt={selectedImage()?.alt}
                    class="w-full object-contain"
                  />
                  <div class="p-4 sm:p-6 sm:pt-0 pt-0" style="background: rgba(26, 26, 26, 0.9); backdrop-filter: blur(10px);">
                    <h3 class="text-lg sm:text-xl font-bold gallery-modal-title mb-2">{selectedImage()?.alt}</h3>
                    <div class="flex flex-wrap items-center gap-4 text-sm gallery-modal-details">
                      <span>📍 {selectedImage()?.location}</span>
                      <Show when={selectedImage()?.day}>
                        <span class="gallery-modal-day">Día {selectedImage()?.day}</span>
                      </Show>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Show>
        </div>

        <div class="text-center mt-12 sm:mt-16">
          <div class="gallery-cta inline-block p-6 sm:p-8 rounded-xl border">
            <div class="text-4xl sm:text-5xl mb-4">📷</div>
            <h3 class="text-lg sm:text-xl font-bold gallery-cta-title mb-2">¡Más fotos próximamente!</h3>
            <p class="gallery-cta-description text-sm sm:text-base">
              Continuaremos añadiendo fotos conforme vivamos esta increíble aventura.
            </p>
          </div>
        </div>
      </div>
      <style>
        {`
          /* Estilos generales de la galería (se mantienen) */
          .gallery-section {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d1b3d 50%, #1a1a1a 100%);
            position: relative;
          }
          
          [data-theme="light"] .gallery-section {
            background: linear-gradient(135deg, #FFE8E8 0%, #FFDDDD 50%, #FFE8E8 100%);
          }

          .gallery-title {
            background: linear-gradient(135deg, #FF1493, #FF0040, #FF6B6B);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 30px rgba(255, 20, 147, 0.5);
          }
          
          [data-theme="light"] .gallery-title {
            background: linear-gradient(135deg, #C41E3A, #8B0000, #DC143C);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: none;
          }

          .gallery-subtitle {
            color: rgba(255, 255, 255, 0.8);
          }
          
          [data-theme="light"] .gallery-subtitle {
            color: #2D1B1B;
            font-weight: 600;
            opacity: 0.95;
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3);
          }

          /* Estilos de los botones de filtro (se aplican desde el componente Solid) */
          .filter-active-primary {
            background: #FF1493 !important;
            color: white !important;
            border-color: #FF1493 !important;
            box-shadow: 0 0 20px rgba(255, 20, 147, 0.6);
          }

          .filter-inactive-primary {
            background: transparent !important;
            color: #FF1493 !important;
            border-color: #FF1493 !important;
          }
          
          .filter-inactive-primary:hover {
            box-shadow: 0 0 20px rgba(255, 20, 147, 0.4);
          }

          .filter-active-temples {
            background: #FF8A80 !important;
            color: white !important;
            border-color: #FF8A80 !important;
            box-shadow: 0 0 20px rgba(255, 138, 128, 0.6);
          }

          .filter-inactive-temples {
            background: transparent !important;
            color: #FF8A80 !important;
            border-color: #FF8A80 !important;
          }
          
          .filter-inactive-temples:hover {
            box-shadow: 0 0 20px rgba(255, 138, 128, 0.4);
          }

          .filter-active-neon {
            background: #FF6B6B !important;
            color: white !important;
            border-color: #FF6B6B !important;
            box-shadow: 0 0 20px rgba(255, 107, 107, 0.6);
          }

          .filter-inactive-neon {
            background: transparent !important;
            color: #FF6B6B !important;
            border-color: #FF6B6B !important;
          }
          
          .filter-inactive-neon:hover {
            box-shadow: 0 0 20px rgba(255, 107, 107, 0.4);
          }

          .filter-active-glutenfree {
            background: #FF0040 !important;
            color: white !important;
            border-color: #FF0040 !important;
            box-shadow: 0 0 20px rgba(255, 0, 64, 0.6);
          }

          .filter-inactive-glutenfree {
            background: transparent !important;
            color: #FF0040 !important;
            border-color: #FF0040 !important;
          }
          
          .filter-inactive-glutenfree:hover {
            box-shadow: 0 0 20px rgba(255, 0, 64, 0.4);
          }

          .filter-active-landmarks {
            background: #FF1493 !important;
            color: white !important;
            border-color: #FF1493 !important;
            box-shadow: 0 0 20px rgba(255, 20, 147, 0.6);
          }

          .filter-inactive-landmarks {
            background: transparent !important;
            color: #FF1493 !important;
            border-color: #FF1493 !important;
          }
          
          .filter-inactive-landmarks:hover {
            box-shadow: 0 0 20px rgba(255, 20, 147, 0.4);
          }

          .filter-active-nature {
            background: #FF8A80 !important;
            color: #1a1a1a !important;
            border-color: #FF8A80 !important;
            box-shadow: 0 0 20px rgba(255, 138, 128, 0.6);
          }

          .filter-inactive-nature {
            background: transparent !important;
            color: #FF8A80 !important;
            border-color: #FF8A80 !important;
          }
          
          .filter-inactive-nature:hover {
            box-shadow: 0 0 20px rgba(255, 138, 128, 0.4);
          }

          /* Estilos de las tarjetas y el modal (se mantienen) */
          .gallery-card {
            background: linear-gradient(135deg, rgba(255, 20, 147, 0.1) 0%, rgba(255, 107, 107, 0.05) 100%);
            border: 1px solid rgba(255, 20, 147, 0.2);
          }
          
          .gallery-card:hover {
            border-color: rgba(255, 20, 147, 0.4);
            box-shadow: 0 8px 32px rgba(255, 20, 147, 0.2);
          }

          .gallery-overlay {
            background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 50%);
          }

          .gallery-overlay-text {
            color: #FFFFFF;
          }

          .gallery-overlay-location {
            color: rgba(255, 255, 255, 0.8);
          }

          .gallery-overlay-day {
            color: #FF1493;
          }

          .gallery-expand-icon {
            background: rgba(0, 0, 0, 0.5);
            color: #FFFFFF;
          }

          .gallery-modal {
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
          }

          .gallery-modal-close {
            background: rgba(0, 0, 0, 0.5);
            color: #FFFFFF;
          }
          
          .gallery-modal-close:hover {
            background: rgba(0, 0, 0, 0.8);
            color: #FF1493;
          }

          .gallery-modal-content {
            background: rgba(26, 26, 26, 0.95);
            border-color: rgba(255, 20, 147, 0.3);
          }

          .gallery-modal-title {
            color: #FFFFFF;
          }

          .gallery-modal-details {
            color: rgba(255, 255, 255, 0.8);
          }

          .gallery-modal-day {
            color: #FF1493;
          }

          .gallery-cta {
            background: linear-gradient(135deg, rgba(255, 20, 147, 0.1) 0%, rgba(255, 107, 107, 0.1) 100%);
            border-color: rgba(255, 20, 147, 0.3);
          }

          .gallery-cta-title {
            color: #FF1493;
          }

          .gallery-cta-description {
            color: rgba(255, 255, 255, 0.8);
          }
        `}
      </style>
    </section>
  );
};

export default GallerySolid;
