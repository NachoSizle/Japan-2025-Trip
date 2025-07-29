import { createSignal, For, Show } from 'solid-js';
import type { Component } from 'solid-js';

export interface Actividad {
  hora: string;
  actividad: string;
  ubicacion: string;
  tipo: string;
  notas?: string;
  notas_extended?: string;
  gluten_free?: boolean;
  destacado?: boolean;
  maps_url?: string;
  direccion?: string;
  costo?: string;
  duracion?: string;
  alternativa_gf?: string;
}

export interface Dia {
  dia: number;
  fecha: string;
  titulo: string;
  ciudad: string;
  actividades: Actividad[];
}

interface Props {
  dias: Dia[];
}

const tipos = [
  { value: 'todos', label: 'Todo' },
  { value: 'gluten-free', label: 'Sin Gluten' },
  { value: 'destacados', label: 'Destacados' },
  { value: 'turismo', label: 'Turismo' },
  { value: 'comida', label: 'Comida' },
  { value: 'transporte', label: 'Transporte' },
  { value: 'alojamiento', label: 'Alojamiento' },
  { value: 'compras', label: 'Compras' },
  { value: 'cultura', label: 'Cultura' },
  { value: 'naturaleza', label: 'Naturaleza' },
];

const SistemaFiltrosSolid: Component<Props> = (props) => {
  const [tipo, setTipo] = createSignal('todos');
  const [ciudad, setCiudad] = createSignal('todas');
  const [filtersOpen, setFiltersOpen] = createSignal(false);

  const ciudades = Array.from(new Set(props.dias.map((d) => d.ciudad)));

  function filtrarActividades(actividades: Actividad[], tipo: string) {
    if (tipo === 'todos') return actividades;
    if (tipo === 'gluten-free') return actividades.filter((a) => a.gluten_free);
    if (tipo === 'destacados') return actividades.filter((a) => a.destacado);
    return actividades.filter((a) => a.tipo === tipo);
  }

  const diasFiltrados = () =>
    props.dias
      .filter((dia) => ciudad() === 'todas' || dia.ciudad === ciudad())
      .map((dia) => ({
        ...dia,
        actividades: filtrarActividades(dia.actividades, tipo()),
      }))
      .filter((dia) => dia.actividades.length > 0);

  return (
    <>
      {/* Panel de control de filtros colapsable */}
      <div class="mb-8">
        <button
          onClick={() => setFiltersOpen(!filtersOpen())}
          class="home-cta filter-toggle-button mx-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 text-base sm:text-lg border-2 border-pink-500 shadow-lg hover:shadow-pink-400/30 focus:outline-none focus:ring-2 focus:ring-pink-400 min-w-[200px]"
          style="background: linear-gradient(135deg, #FF6B6B, #FF1493); border-color: rgba(255, 255, 255, 0.1);"
          aria-label={filtersOpen() ? "Cerrar panel de filtros" : "Abrir panel de filtros"}
          aria-expanded={filtersOpen()}
        >
          <span>Filtrar itinerario</span>
          <span class="text-xs transition-transform duration-300">{filtersOpen() ? '▲' : '▼'}</span>
        </button>
        
        <Show when={filtersOpen()}>
          <div class="filter-panel mt-4 p-5 rounded-xl backdrop-blur-sm bg-black/20 border border-white/10 max-w-4xl mx-auto dark:bg-black/20 dark:border-white/10">
            
            <h3 class="text-lg font-bold mb-4 text-center text-white dark:text-white">Tipos de actividades</h3>
            {/* Botones de filtros rápidos */}
            <div class="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-4 mb-6 px-2">
                            <button 
                onClick={() => { setTipo('todos'); setCiudad('todas'); }}
                class={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 border-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
                  tipo() === 'todos' && ciudad() === 'todas' 
                    ? 'bg-pink-500 text-white border-pink-500 shadow-lg shadow-pink-500/50' 
                    : 'bg-white/90 text-gray-700 border-white/60 hover:bg-pink-100 hover:border-pink-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
                }`}
                aria-label="Mostrar todas las actividades en todas las ciudades"
              >
                🌟 Todos
              </button>
              <button 
                onClick={() => setTipo('gluten-free')}
                class={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 border-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
                  tipo() === 'gluten-free'
                    ? 'bg-pink-400 text-white border-pink-400 shadow-lg shadow-pink-400/50' 
                    : 'bg-transparent text-pink-400 border-pink-400 hover:shadow-lg hover:shadow-pink-400/30'
                }`}
                aria-label="Filtrar actividades sin gluten"
              >
                🌾🚫 Sin Gluten
              </button>
              <button 
                onClick={() => setTipo('destacados')}
                class={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 border-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
                  tipo() === 'destacados'
                    ? 'bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/50' 
                    : 'bg-transparent text-red-500 border-red-500 hover:shadow-lg hover:shadow-red-500/30'
                }`}
                aria-label="Filtrar actividades destacadas"
              >
                ⭐ Destacados
              </button>
                            <button 
                onClick={() => setTipo('turismo')}
                class={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 border-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
                  tipo() === 'turismo'
                    ? 'bg-pink-300 text-gray-800 border-pink-300 shadow-lg shadow-pink-300/50' 
                    : 'bg-transparent text-pink-300 border-pink-300 hover:shadow-lg hover:shadow-pink-300/30'
                }`}
                aria-label="Filtrar actividades de turismo"
              >
                🗼 Turismo
              </button>
            </div>
        
            <h3 class="text-lg font-bold mb-4 text-center text-white dark:text-white">Ciudades</h3>
            {/* Filtros por ciudad */}
            <div class="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-4 mb-6 px-2">
              <button 
                onClick={() => setCiudad('todas')}
                class={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 border-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
                  ciudad() === 'todas'
                    ? 'bg-pink-700 text-white border-pink-700 shadow-lg shadow-pink-700/50' 
                    : 'bg-transparent text-pink-700 border-pink-700 hover:shadow-lg hover:shadow-pink-700/30'
                }`}
                aria-label="Mostrar actividades de todas las ciudades"
              >
                🌏 Todas
              </button>
              <For each={ciudades}>{(c) => (
                <button 
                  onClick={() => setCiudad(c)}
                  class={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 border-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
                    ciudad() === c
                      ? 'bg-pink-700 text-white border-pink-700 shadow-lg shadow-pink-700/50' 
                      : 'bg-transparent text-pink-700 border-pink-700 hover:shadow-lg hover:shadow-pink-700/30'
                  }`}
                  aria-label={`Filtrar actividades de ${c}`}
                >
                  {c}
                </button>
              )}</For>
            </div>
          </div>
        </Show>
      </div>
      
      {/* Contador de días filtrados */}
      <div class="text-center mb-8">
        <p class="text-sm text-white/70 font-medium dark:text-white/70">
          Mostrando {diasFiltrados().length} de {props.dias.length} días
        </p>
      </div>
      <Show when={diasFiltrados().length === 0}>
        <p class="text-center text-gray-400 dark:text-white/70">No hay actividades para estos filtros.</p>
      </Show>
      <For each={diasFiltrados()}>{(dia) => (
        <div class="daycard-container max-w-2xl mx-auto mb-10 rounded-xl overflow-hidden transition-all hover:shadow-xl hover:shadow-pink-400/20 hover:-translate-y-1 dark:shadow-pink-400/10 dark:hover:shadow-pink-400/20 dark:hover:border-pink-400/50" style="background: rgba(255, 20, 147, 0.08); border: 1px solid rgba(255, 20, 147, 0.3); backdrop-filter: blur(10px);">
          {/* Cabecera del día */}
          <div class="daycard-header p-4 sm:p-5 md:p-6 rounded-t-xl backdrop-blur-sm" style="background: rgba(0, 0, 0, 0.2); border-bottom: 1px solid rgba(255, 20, 147, 0.3);">
            <div class="flex justify-between items-center mb-3">
              <div class="flex items-center gap-2">
                <h3 class="text-lg sm:text-xl md:text-2xl font-bold" style="color: #FF1493; text-shadow: 0 0 10px rgba(255, 20, 147, 0.5);">
                  Día {dia.dia}
                </h3>
                <span class="font-mono text-sm" style="color: rgba(255, 255, 255, 0.7);">{dia.fecha}</span>
              </div>
              <span class="px-3 py-1 rounded-full text-xs font-medium bg-opacity-20 backdrop-blur-sm" 
                    style="background-color: rgba(255, 20, 147, 0.3); color: white; border: 1px solid #FF1493;">
                {dia.ciudad}
              </span>
            </div>
            <h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-2" 
                style="background: linear-gradient(135deg, #FF1493, #FF6B6B); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
              {dia.titulo}
            </h2>
          </div>
          {/* Lista de actividades */}
          <div class="daycard-body p-4 sm:p-5 md:p-6 rounded-b-xl backdrop-blur-sm" style="background: rgba(0, 0, 0, 0.1);">
            <For each={dia.actividades}>{(act, index) => (
              <div 
                class={`activity-item mb-2 py-2 px-3 rounded-lg activity-${act.tipo} ${act.gluten_free ? 'gluten-free-activity' : ''} ${act.destacado ? 'featured-activity' : ''}`}
                style="background: rgba(25, 25, 25, 0.7); box-shadow: 0 4px 12px rgba(255, 20, 147, 0.4); border-left: 4px solid; border-left-color: rgba(255, 20, 147, 0.8); transition: all 0.3s ease; position: relative; overflow: hidden;">
                <div class="flex items-start gap-1">
                  <div class="activity-icon-container flex-shrink-0 bg-white rounded-full w-7 h-7 flex items-center justify-center">
                    <span class="activity-icon text-white" style="color: white; font-size: 0.9rem;">
                      {act.tipo === 'turismo' ? '🗼' :
                       act.tipo === 'comida' ? '🍱' :
                       act.tipo === 'transporte' ? '🚄' :
                       act.tipo === 'alojamiento' ? '🏨' :
                       act.tipo === 'compras' ? '🛍️' :
                       '📍'}
                    </span>
                  </div>
                  <div class="activity-content flex-1 ml-1">
                    <div class="flex flex-wrap items-center gap-1">
                      <h4 class="font-bold text-base activity-title leading-tight mt-0 mb-0" style="color: white; font-weight: 700; background: linear-gradient(135deg, #FF1493, #FF6B6B); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">
                        {act.actividad}
                      </h4>
                      {act.gluten_free && (
                        <span class="activity-tag-gf text-xs" style="background: linear-gradient(135deg, #FF8A80, #FF6B6B); color: white; font-size: 0.65rem; padding: 0.1rem 0.3rem; border-radius: 9999px; font-weight: 600; display: inline-flex; align-items: center; line-height: 1; box-shadow: 0 1px 3px rgba(255, 138, 128, 0.4);">
                          🌾🚫
                        </span>
                      )}
                      {act.destacado && (
                        <span class="activity-tag-featured text-xs" style="background: linear-gradient(135deg, #FF1493, #FF0040); color: white; font-size: 0.65rem; padding: 0.1rem 0.3rem; border-radius: 9999px; font-weight: 600; display: inline-flex; align-items: center; line-height: 1; box-shadow: 0 1px 3px rgba(255, 20, 147, 0.4);">
                          ⭐
                        </span>
                      )}
                    </div>
                    <div class="flex items-center text-xs">
                      <span class="activity-time font-mono" style="color: rgba(255, 255, 255, 0.7); font-family: monospace;">{act.hora}</span>
                      <span class="mx-1" style="color: rgba(255, 255, 255, 0.7);">•</span>
                      {act.maps_url ? (
                        <a href={act.maps_url} target="_blank" rel="noopener noreferrer" class="activity-details map-link" style="text-decoration: none; transition: all 0.2s ease; display: inline-flex; align-items: center;">
                          <span class="map-link-inner" style="background: rgba(255, 20, 147, 0.2); border-radius: 4px; padding: 2px 6px; color: rgba(255, 255, 255, 0.9); font-weight: 600; font-size: 0.75rem; transition: all 0.2s ease; border: 1px solid rgba(255, 20, 147, 0.3);">🗺️ Ver en mapa</span>
                        </a>
                      ) : (
                        <span class="activity-details" style="color: rgba(255, 255, 255, 0.7); font-size: 0.875rem;">{act.ubicacion}</span>
                      )}
                    </div>
                    {act.notas && <p class="text-xs activity-notes italic text-opacity-80" style="font-style: italic; color: rgba(255, 255, 255, 0.6);">{act.notas}</p>}
                  </div>
                </div>
              </div>
            )}</For>
            
            {/* Enlace a la página completa del día */}
            <div class="mt-3 text-center">
              <a href={`${import.meta.env.BASE_URL}itinerario/${dia.dia}`} class="view-full-day-link px-4 py-1.5 rounded-full text-sm font-medium inline-block transition-all duration-300" style="background: linear-gradient(135deg, #FF1493 0%, #FF6B6B 100%); color: white; font-weight: 600; border-radius: 9999px; transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(255, 20, 147, 0.3); border: none; text-decoration: none;">
                Ver día completo →
              </a>
            </div>
          </div>
        </div>
      )}</For>
    </>
  );
};

export default SistemaFiltrosSolid;
