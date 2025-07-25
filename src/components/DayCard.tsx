import { For, Show } from "solid-js";

export interface Props {
  day: number;
  fecha: string;
  titulo: string;
  ciudad: string;
  actividades: Array<{
    hora: string;
    actividad: string;
    ubicacion: string;
    tipo: string;
    gluten_free?: boolean;
    destacado?: boolean;
    alternativa_gf?: string;
    notas?: string;
    direccion?: string;
    maps_url?: string;
  }>;
}

// Función para obtener el icono según el tipo de actividad
function getActivityIcon(tipo: string) {
  const icons: Record<string, string> = {
    'transporte': '✈️',
    'alojamiento': '🏨',
    'comida': '🍽️',
    'turismo': '🗼',
    'cultura': '🏯',
    'naturaleza': '🌸'
  };
  return icons[tipo] || '📍';
}

// Función para obtener color según el tipo
function getActivityColor(tipo: string) {
  const colors: Record<string, string> = {
    'transporte': 'daycard-activity-transport',
    'alojamiento': 'daycard-activity-hotel',
    'comida': 'daycard-activity-food',
    'turismo': 'daycard-activity-tourism',
    'cultura': 'daycard-activity-culture',
    'naturaleza': 'daycard-activity-nature'
  };
  return colors[tipo] || 'daycard-activity-default';
}

export default function DayCard(props: Props) {
  return (
    <div class="daycard-container backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 transition-all duration-300 group">
      {/* Header del día */}
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 md:mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 md:gap-4">
          <span class="daycard-day-number text-base sm:text-lg md:text-xl font-bold">Día {props.day}</span>
          <span class="daycard-date text-xs sm:text-sm md:text-base font-mono">{props.fecha}</span>
          <span class="daycard-city text-xs sm:text-sm md:text-base font-semibold">{props.ciudad}</span>
        </div>
      </div>

      <div class="mb-3 sm:mb-4">
        <h3 class="daycard-title text-lg sm:text-xl md:text-2xl font-bold mb-2">{props.titulo}</h3>
      </div>

      {/* Lista de actividades optimizada para móvil */}
      <div class="space-y-2 sm:space-y-3 md:space-y-4">
        <For each={props.actividades}>
          {(act) => (
            <div class={`flex items-start gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 md:p-4 rounded-lg border-l-4 ${getActivityColor(act.tipo)} daycard-activity mb-4`}>
              <div class="text-lg sm:text-xl md:text-2xl flex-shrink-0 mt-0.5">{getActivityIcon(act.tipo)}</div>
              <div class="flex-1 min-w-0 overflow-hidden">
                <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <span class="daycard-activity-name font-bold text-sm sm:text-base md:text-lg break-words">{act.actividad}</span>
                  <div class="flex items-center gap-1 sm:gap-2 flex-wrap">
                    <Show when={act.gluten_free}>
                      <span class="daycard-badge-gf px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-semibold text-xs whitespace-nowrap">🌾🚫 GF</span>
                    </Show>
                    <Show when={act.destacado}>
                      <span class="daycard-badge-featured px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-semibold text-xs whitespace-nowrap">⭐</span>
                    </Show>
                  </div>
                </div>
                <div class="daycard-activity-details text-xs sm:text-sm font-mono break-words overflow-hidden text-ellipsis">
                  {act.hora} •
                  <Show when={act.maps_url} fallback={<span> {act.ubicacion}</span>}>
                    <a href={act.maps_url} target="_blank" rel="noopener noreferrer" class="hover:text-blue-400 transition-colors duration-200">
                      📍 {act.ubicacion}
                    </a>
                  </Show>
                </div>
                <Show when={act.direccion}>
                  <div class="daycard-address text-xs mt-1 font-mono break-words opacity-75">🏠 {act.direccion}</div>
                </Show>
                <Show when={act.alternativa_gf}>
                  <div class="daycard-gf-alternative text-xs mt-1 break-words">{act.alternativa_gf}</div>
                </Show>
                <Show when={act.notas}>
                  <div class="daycard-notes text-xs mt-1 italic break-words">{act.notas}</div>
                </Show>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}