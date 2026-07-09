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
    ogrodowe_zdjecie: z.number(),
    hotspot_top: z.number(),
    hotspot_left: z.number(),
    ilosc: z.number().optional(),
    wielkosc_sadzonki: z.string().optional(),
  }),
});

export const collections = { rosliny };
