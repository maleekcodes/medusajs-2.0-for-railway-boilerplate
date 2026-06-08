import { defineField } from 'sanity'

/** Reusable SEO title + description fields for CMS pages. */
export const seoFields = [
  defineField({
    name: 'seoTitle',
    title: 'SEO Title',
    type: 'string',
    description: 'Browser tab and search result title. Keep under ~60 characters.',
  }),
  defineField({
    name: 'seoDescription',
    title: 'SEO Description',
    type: 'text',
    rows: 3,
    description: 'Meta description for search and social previews. Keep under ~160 characters.',
  }),
]
