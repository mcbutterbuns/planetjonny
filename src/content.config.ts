import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const photos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/photos' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      catalogId: z.string(),
      category: z.enum(['Deep Sky', 'Planetary', 'Lunar', 'Solar', 'Widefield']),
      coverImage: image(),
      captureDate: z.string(),
      location: z.string(),
      bortleClass: z.number().min(1).max(9),
      constellation: z.string(),
      equipment: z.object({
        telescope: z.string(),
        camera: z.string(),
        mount: z.string(),
        filters: z.string(),
        guiding: z.string().optional(),
      }),
      acquisition: z.object({
        lightFrames: z.union([
          z.string(),
          z.array(
            z.object({
              filter: z.string(),
              subframes: z.string(),
              duration: z.string().optional(),
            })
          ),
        ]),
        totalIntegration: z.string(),
        exposurePerFrame: z.string().optional(),
        gainIso: z.string().optional(),
        calibration: z.string().optional(),
      }),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.string(),
      description: z.string(),
      author: z.string().default('Jonny'),
      coverImage: image().optional(),
      tags: z.array(z.string()),
      readTime: z.string().default('5 min read'),
      featured: z.boolean().default(false),
    }),
});

export const collections = { photos, blog };
