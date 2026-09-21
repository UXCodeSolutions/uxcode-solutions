// content.config.ts — Colección de blog para @nuxt/content
import { defineCollection, z } from '@nuxt/content'

export const collections = {
  blog: defineCollection({
    type: 'page',
    source: 'blog/**/*.md',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      image: z.string().nullable().optional(),
      date: z.string(),
      category: z.string(),
      readingTime: z.string(),
      author: z.string().default('Equipo UXcode Solutions'),
    }),
  }),
}
