import { z, defineCollection } from "astro:content";


const flightsCollection = defineCollection({
  type: "data",
  schema: z.object({
    direction: z.string(),
    flight_id: z.string(),
    from: z.object({
      city: z.string(),
      airport: z.string(),
      departure_time: z.string()
    }),
    stopover: z.object({
      city: z.string(),
      airport: z.string(),
      arrival_time: z.string(),
      departure_time: z.string()
    }),
    to: z.object({
      city: z.string(),
      airport: z.string(),
      arrival_time: z.string()
    }),
    airline: z.string(),
    flight_segments: z.array(z.object({
      flight_number: z.string(),
      from: z.string(),
      to: z.string(),
      departure: z.string(),
      arrival: z.string(),
      tracking_url: z.string()
    })),
    baggage: z.object({
      checked: z.string(),
      hand: z.string(),
      personal_item: z.string().optional()
    }),
    notes: z.string()
  })
});
const checklistCollection = defineCollection({
  type: "data",
  schema: z.object({
    categoria: z.string(),
    emoji: z.string(),
    items: z.array(z.string())
  })
});

const actividadSchema = z.object({
  hora: z.string().optional(),
  actividad: z.string(),
  descripcion: z.string().optional(),
  ubicacion: z.string().optional(),
  tipo: z.string().optional(),
  destacado: z.boolean().optional(),
  costo: z.string().optional(),
  duracion: z.string().optional(),
  gluten_free: z.boolean().optional(),
  alternativa_gf: z.string().optional(),
  notas: z.string().optional(),
  notas_extended: z.string().optional(),
  direccion: z.string().optional(),
  maps_url: z.string().optional(),
  nota: z.string().optional()
});

const restauranteSchema = z.object({
  nombre: z.string(),
  ubicacion: z.string(),
  especialidad: z.string(),
  distancia_alojamiento: z.string().optional(),
  destacado: z.boolean().optional(),
  nota: z.string().optional()
});

const dayItinerarySchema = z.object({
  dia: z.number(),
  fecha: z.string(),
  titulo: z.string(),
  ciudad: z.string(),
  distrito: z.string(),
  clima: z.string(),
  actividades: z.array(actividadSchema),
  restaurantes_gluten_free_dia: z.array(restauranteSchema).optional(),
  transporte_dia: z.string().optional(),
  gasto_total: z.string().optional(),
  notas_dia: z.string().optional(),
});

const journeySchema = z.object({
  duracion_dias: z.number(),
  ciudades_principales: z.array(z.string()),
  fechas: z.object({
    inicio: z.string(),
    fin: z.string()
  }),
  presupuesto_estimado: z.string(),
  moneda: z.string(),
  zona_horaria: z.string(),
  descripcion: z.string(),
  titulo: z.string(),
});

const glutenFreeRestaurantSchema = z.object({
  nombre: z.string(),
  ciudad: z.string(),
  ubicacion: z.string(),
  especialidad: z.string(),
  puntuacion: z.number().min(0).max(5),
  direccion: z.string().optional(),
  telefono: z.string().optional(),
  url: z.string().url().optional(),
  precio_promedio: z.string().optional(),
  destacado: z.boolean().optional(),
});

const utilPhraseSchema = z.object({
  español: z.string(),
  japones: z.string(),
  romaji: z.string(),
  categoria: z.string().optional(),
});

const recommendedAppSchema = z.object({
  nombre: z.string(),
  descripcion: z.string(),
  plataforma: z.string(),
  gratuita: z.boolean(),
  url_descarga: z.string().url(),
  puntuacion: z.number().min(0).max(5).optional(),
});

const productosEmergenciaSchema = z.object({
  producto: z.string(),
  ubicacion: z.string(),
  precio: z.string().optional(),
  descripcion: z.string().optional(),
});

const cadenasSegurasSchema = z.object({
  nombre: z.string(),
  descripcion: z.string().optional(),
  ubicaciones: z.string().optional(),
  puntuacion: z.number().min(0).max(5).optional(),
});

const consejosGeneralesSchema = z.object({
  consejo: z.string(),
  categoria: z.string().optional(),
});

const itinerario = defineCollection({
  type: "data",
  schema: z.object({
    viaje: journeySchema,
    dias: z.array(dayItinerarySchema),
    restaurantes_gluten_free: z.array(glutenFreeRestaurantSchema),
    frases_utiles: z.array(utilPhraseSchema),
    apps_recomendadas: z.array(recommendedAppSchema),
    productos_emergencia: z.array(productosEmergenciaSchema),
    cadenas_seguras: z.array(cadenasSegurasSchema),
    consejos_generales: z.array(consejosGeneralesSchema),
  })
});

export const collections = {
  checklist: checklistCollection,
  flights: flightsCollection,
  itinerario,
};
