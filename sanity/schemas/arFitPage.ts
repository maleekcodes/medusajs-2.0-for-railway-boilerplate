import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'arFitPage',
  title: 'Try-on page',
  type: 'document',
  fields: [
    // Page Header
    defineField({
      name: 'label',
      title: 'Page Label',
      type: 'string',
      description: 'Small label above the title (e.g., "System v1.0")',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'First line of subtitle',
    }),
    defineField({
      name: 'subtitleLine2',
      title: 'Subtitle Line 2',
      type: 'string',
      description: 'Second line of subtitle',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
      description: 'e.g., "Start Fit Analysis"',
    }),

    // Philosophy Section
    defineField({
      name: 'philosophyHeadline',
      title: 'Philosophy Headline',
      type: 'string',
    }),
    defineField({
      name: 'philosophyHeadlineLine2',
      title: 'Philosophy Headline Line 2',
      type: 'string',
    }),
    defineField({
      name: 'philosophyParagraph1',
      title: 'Philosophy Paragraph 1',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'philosophyParagraph2',
      title: 'Philosophy Paragraph 2',
      type: 'text',
      rows: 3,
    }),

    // Steps Section
    defineField({
      name: 'stepsHeading',
      title: 'Steps Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'steps',
      title: 'Analysis Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'Step ID',
              type: 'string',
              description: 'e.g., "01", "02"',
            }),
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Step Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'shape',
              title: 'Shape',
              type: 'string',
              options: {
                list: [
                  { title: 'Circle', value: 'circle' },
                  { title: 'Square', value: 'square' },
                  { title: 'Triangle', value: 'triangle' },
                  { title: 'Rhombus', value: 'rhombus' },
                  { title: 'Trapezoid', value: 'trapezoid' },
                  { title: 'Pentagon', value: 'pentagon' },
                  { title: 'Hexagon', value: 'hexagon' },
                  { title: 'Octagon', value: 'octagon' },
                  { title: 'Ellipse', value: 'ellipse' },
                  { title: 'Curve', value: 'curve' },
                ],
              },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'id',
            },
          },
        },
      ],
    }),

    // Privacy Section
    defineField({
      name: 'privacyBadge',
      title: 'Privacy Badge Text',
      type: 'string',
      description: 'e.g., "Privacy Encrypted"',
    }),
    defineField({
      name: 'privacyText',
      title: 'Privacy Text',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'versionLabel',
      title: 'Version Label',
      type: 'string',
      description: 'e.g., "System v1.0 (Beta)"',
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
        title: 'Try-on page',
        subtitle: 'Product preview on your photo',
      }
    },
  },
})
