import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    // Page Header
    defineField({
      name: 'label',
      title: 'Page Label',
      type: 'string',
      description: 'Small label above the title (e.g., "Identity & Form")',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // Lead Quote
    defineField({
      name: 'leadQuote',
      title: 'Lead Quote',
      type: 'string',
      description: 'Main opening quote (e.g., "XYZ London is a fashion house built on intent.")',
    }),

    // Body Paragraphs
    defineField({
      name: 'bodyParagraphs',
      title: 'Body Paragraphs',
      type: 'array',
      description: 'Main body content paragraphs',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'column',
              title: 'Column',
              type: 'string',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Right', value: 'right' },
                ],
              },
            }),
            defineField({
              name: 'isHighlighted',
              title: 'Highlighted',
              type: 'boolean',
              description: 'Display this paragraph in a larger/emphasized style',
            }),
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'column',
            },
          },
        },
      ],
    }),

    // Sustainability Note
    defineField({
      name: 'sustainabilityNote',
      title: 'Sustainability Note',
      type: 'text',
      rows: 3,
      description: 'Paragraph about sustainable practices',
    }),

    // Closing Lines
    defineField({
      name: 'closingLine1',
      title: 'Closing Line 1',
      type: 'string',
    }),
    defineField({
      name: 'closingLine2',
      title: 'Closing Line 2',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Final tagline (e.g., "From the unknown to the known.")',
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page',
        subtitle: 'Philosophy and Brand Story',
      }
    },
  },
})
