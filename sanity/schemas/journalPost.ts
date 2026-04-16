import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'journalPost',
  title: 'Journal Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Theory', value: 'Theory' },
          { title: 'Process', value: 'Process' },
          { title: 'Dialogue', value: 'Dialogue' },
          { title: 'Lookbook', value: 'Lookbook' },
          { title: 'Campaign', value: 'Campaign' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredShape',
      title: 'Featured Shape',
      type: 'string',
      description: 'Abstract shape to display on the card',
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
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Brief summary shown in listings',
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Show this post prominently on the journal page',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'featuredImage',
    },
    prepare(selection) {
      const { title, category, media } = selection
      return {
        title,
        subtitle: category,
        media,
      }
    },
  },
})
