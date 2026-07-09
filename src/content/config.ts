import { defineCollection, z } from 'astro:content';

const rosliny = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    zdjecie: z.string(),
    lokalizacja: z.string(),
    podlewanie: z.string(),
    naslonecznienie: z.string(),
    przycinanie: z.string(),
    hotspoty: z.array(
      z.object({
        zdjecie: z.number(),
        top: z.number(),
        left: z.number(),
      })
    ),
    ilosc: z.number().optional(),
    wielkosc_sadzonki: z.string().optional(),
  }),
});

export const collections = { rosliny };