import { z, defineCollection } from "astro:content";

const checklistCollection = defineCollection({
  type: "data",
  schema: z.object({
    categoria: z.string(),
    emoji: z.string(),
    items: z.array(z.string())
  })
});

export const collections = {
  checklist: checklistCollection
};
