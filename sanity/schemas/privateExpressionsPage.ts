import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'privateExpressionsPage',
  title: 'Private Expressions (OOO)',
  type: 'document',
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrowLabel',
      title: 'Eyebrow label',
      type: 'string',
      description: 'Usually OOO.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'focalLine',
      title: 'Accent line',
      description: 'e.g. “The Few.”',
      type: 'string',
    }),
    defineField({
      name: 'narrativeParagraph1',
      title: 'Narrative paragraph 1',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'narrativeParagraph2',
      title: 'Narrative paragraph 2',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'closingLine',
      title: 'Closing line',
      description: 'e.g. “Quiet. Personal. Defined.”',
      type: 'string',
    }),
    defineField({
      name: 'formIntro',
      title: 'Text above embedded form',
      type: 'string',
    }),
    defineField({
      name: 'hubspotFormUrl',
      title: 'Form embed URL (HubSpot)',
      type: 'url',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email (shown as mailto)',
      type: 'string',
      description: 'e.g. contact@wearxyz.co',
    }),
    defineField({
      name: 'backToHomeLabel',
      title: '“Back to home” label',
      type: 'string',
    }),
    defineField({
      name: 'homeTeaserTitle',
      title: 'Home teaser — headline',
      type: 'string',
      description: 'Large orange headline on the homepage (e.g. “Highest Expression”).',
    }),
    defineField({
      name: 'homeTeaserLine1',
      title: 'Home teaser — line 1',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'homeTeaserLine2',
      title: 'Home teaser — line 2',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'homeTeaserButtonLabel',
      title: 'Home teaser — button label',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Private Expressions (OOO)',
        subtitle: 'OOO page + home teaser',
      }
    },
  },
})
