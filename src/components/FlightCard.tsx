import { For, Show } from 'solid-js';

export interface Flight {
  direction: string;
  flight_id: string;
  from: {
    city: string;
    airport: string;
    departure_time: string;
  };
  stopover?: {
    city: string;
    airport: string;
    arrival_time: string;
    departure_time: string;
  };
  to: {
    city: string;
    airport: string;
    arrival_time: string;
  };
  airline: string;
  flight_segments: Array<{
    flight_number: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    tracking_url: string;
  }>;
  baggage: {
    checked: string;
    hand: string;
    personal_item?: string;
  };
  notes: string;
}

interface FlightCardProps {
  title: string;
  flight?: Flight;
}

export default function FlightCard(props: FlightCardProps) {
  const { flight, title } = props;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div class="flight-card bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
        <div class="flex items-center justify-between mb-4 flex-col gap-4 sm:flex-row sm:gap-0">
          <div class="flex items-center space-x-3">
            <div class="flight-icon text-3xl">✈️</div>
            <div>
              <h3 class="flight-title text-lg font-bold m-0 text-blue-400">
                {title}
              </h3>
              <Show when={flight}>
                <p class="flight-date text-sm m-0 text-gray-300">
                  {formatDate(flight!.from.departure_time)}
                </p>
              </Show>
            </div>
          </div>
          <Show when={flight}>
            <div class="flight-status px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-300">
              {flight!.airline}
            </div>
          </Show>
        </div>
        
        <Show when={flight} fallback={
          <div class="flight-placeholder border-2 border-dashed border-gray-400/30 rounded-lg p-8 text-center">
            <div class="text-6xl mb-4 opacity-50">🏠</div>
            <p class="text-gray-400 font-medium mb-2">
              Información del vuelo no disponible
            </p>
            <p class="text-gray-500 text-sm">
              Los datos se completarán más adelante
            </p>
          </div>
        }>
          <div class="space-y-4">
            <For each={flight!.flight_segments}>{(segment) => 
              <div class="flight-segment border-t border-gray-400/20 pt-4">
                <div class="flex justify-between items-center mb-2">
                  <div class="font-bold text-sm">{segment.from} → {segment.to}</div>
                  <a href={segment.tracking_url} target="_blank" rel="noopener noreferrer" class="flight-tracker-link group flex items-center space-x-2 bg-gray-700/50 px-3 py-1.5 rounded-full hover:bg-blue-500/50 transition-colors">
                    <span class="text-xs font-mono text-white">
                      {segment.flight_number}
                    </span>
                    <span class="text-xs text-blue-300 group-hover:text-white transition-colors">Rastrear 🛰️</span>
                  </a>
                </div>
                <div class="text-xs text-gray-400">
                  <p class="m-0 mb-1">Salida: {formatDate(segment.departure)} a las {formatTime(segment.departure)}</p>
                  <p class="m-0 mt-1">Llegada: {formatDate(segment.arrival)} a las {formatTime(segment.arrival)}</p>
                </div>
              </div>
            }</For>
          </div>

          <div class="mt-4 border-t border-gray-400/20 pt-4 text-xs text-gray-400">
            <p><strong>Equipaje:</strong> {flight!.baggage.checked} facturado, {flight!.baggage.hand} de mano.</p>
            <p class="mt-2"><em>{flight!.notes}</em></p>
          </div>
        </Show>
      </div>
      <style>
        {`
          .flight-card {
            background: rgba(26, 26, 26, 0.8);
            border: 1px solid rgba(59, 130, 246, 0.3);
          }
          
          .flight-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2);
          }
          
          .flight-title {
            color: #60A5FA;
          }
          
          .flight-date {
            color: rgba(255, 255, 255, 0.7);
          }
          
          /* Modo claro */
          [data-theme="light"] .flight-card {
            background: rgba(255, 250, 250, 0.9) !important;
            border: 2px solid rgba(59, 130, 246, 0.3) !important;
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1);
          }
          
          [data-theme="light"] .flight-card:hover {
            background: rgba(239, 246, 255, 0.95) !important;
            border-color: rgba(59, 130, 246, 0.5) !important;
            box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2) !important;
          }
          
          [data-theme="light"] .flight-title {
            color: #1D4ED8 !important;
            font-weight: 700;
          }
          
          [data-theme="light"] .flight-date {
            color: #4B5563 !important;
            font-weight: 500;
          }
          
          [data-theme="light"] .flight-status {
            background: rgba(59, 130, 246, 0.1) !important;
            border-color: rgba(59, 130, 246, 0.3) !important;
            color: #1D4ED8 !important;
            font-weight: 600;
          }
          
          [data-theme="light"] .flight-placeholder {
            border-color: rgba(107, 114, 128, 0.4) !important;
          }
          
          [data-theme="light"] .flight-placeholder p:first-of-type {
            color: #374151 !important;
            font-weight: 600;
          }
          
          [data-theme="light"] .flight-placeholder p:last-of-type {
            color: #6B7280 !important;
            font-weight: 500;
          }
        `}
      </style>
    </>
  );
}