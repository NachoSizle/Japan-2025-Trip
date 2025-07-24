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
  );
};

export default GallerySolid;