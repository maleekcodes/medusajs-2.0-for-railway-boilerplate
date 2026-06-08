import { defineArrayMember } from 'sanity'

/** Minimal portable text: paragraphs with bold, italic, and links. */
export const simpleRichTextMember = defineArrayMember({
  type: 'block',
  styles: [{ title: 'Normal', value: 'normal' }],
  lists: [],
  marks: {
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
    ],
    annotations: [
      {
        name: 'link',
        type: 'object',
        title: 'Link',
        fields: [
          {
            name: 'href',
            type: 'url',
            title: 'URL',
            validation: (Rule) =>
              Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
          },
        ],
      },
    ],
  },
})
