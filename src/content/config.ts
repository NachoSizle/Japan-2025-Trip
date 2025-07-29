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

export const collections = {
  checklist: checklistCollection,
  flights: flightsCollection
};
