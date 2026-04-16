import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main headline displayed over the hero section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 2,
      description: 'Supporting text below the headline',
    }),
    defineField({
      name: 'heroCta',
      title: 'Hero CTA Text',
      type: 'string',
      description: 'Call-to-action button text (e.g., "Explore Form")',
    }),
    defineField({
      name: 'heroFigureLabels',
      title: 'Hero Figure Labels',
      type: 'object',
      fields: [
        defineField({
          name: 'physical',
          title: 'Physical Label',
          type: 'string',
        }),
        defineField({
          name: 'digital',
          title: 'Digital Label',
          type: 'string',
        }),
      ],
    }),

    // Introduction Section
    defineField({
      name: 'introLabel',
      title: 'Introduction Label',
      type: 'string',
      description: 'Small label above the intro heading (e.g., "Manifesto")',
    }),
    defineField({
      name: 'introHeadline',
      title: 'Introduction Headline',
      type: 'text',
      rows: 3,
      description: 'Main intro heading text',
    }),
    defineField({
      name: 'introHeadlineAccent',
      title: 'Introduction Headline Accent',
      type: 'text',
      rows: 2,
      description: 'Lighter/accent part of the intro heading',
    }),
    defineField({
      name: 'introParagraph',
      title: 'Introduction Paragraph',
      type: 'text',
      rows: 4,
      description: 'Supporting paragraph for the intro section',
    }),
    defineField({
      name: 'introText',
      title: 'Introduction Text (Simple)',
      type: 'text',
      rows: 4,
      description: 'Single paragraph introduction text for the home page',
    }),

    // Philosophy / Digital Form Section
    defineField({
      name: 'philosophyTitle',
      title: 'Philosophy Section Title',
      type: 'string',
    }),
    defineField({
      name: 'philosophyComingLabel',
      title: 'Philosophy Coming Label',
      type: 'string',
      description: 'e.g., "COMING 2027"',
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
    defineField({
      name: 'philosophyCtaLabel',
      title: 'Philosophy CTA Label',
      type: 'string',
      description: 'e.g., "Explore Digital"',
    }),
    defineField({
      name: 'manifestoLines',
      title: 'Manifesto Lines',
      type: 'array',
      description: 'Array of manifesto statements displayed in the philosophy section',
      of: [{ type: 'string' }],
    }),

    // Try-on section (field ids unchanged for existing content)
    defineField({
      name: 'arFitLabel',
      title: 'Try-on — label',
      type: 'string',
      description: 'e.g., "Try-on"',
    }),
    defineField({
      name: 'arFitTitle',
      title: 'Try-on — title',
      type: 'string',
    }),
    defineField({
      name: 'arFitParagraph',
      title: 'Try-on — paragraph',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'arFitCtaLabel',
      title: 'Try-on — CTA label',
      type: 'string',
      description: 'e.g., "How it works"',
    }),

    // Private Gate Section
    defineField({
      name: 'privateGateLabel',
      title: 'Private Gate Label',
      type: 'string',
      description: 'e.g., "Exclusive Access"',
    }),
    defineField({
      name: 'privateGateTitle',
      title: 'Private Gate Title',
      type: 'string',
    }),
    defineField({
      name: 'privateGateParagraph',
      title: 'Private Gate Paragraph',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'privateGateInputPlaceholder',
      title: 'Email Input Placeholder',
      type: 'string',
    }),
    defineField({
      name: 'privateGateButtonLabel',
      title: 'Submit Button Label',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
        subtitle: 'Hero, Introduction, Philosophy, Try-on, Private Gate',
      }
    },
  },
})
