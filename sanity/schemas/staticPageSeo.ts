import { defineField, defineType } from 'sanity'

import { seoFields } from './objects/seo'

const pageSeoGroup = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    options: { collapsible: true, collapsed: false },
    fields: [...seoFields],
  })

export default defineType({
  name: 'staticPageSeo',
  title: 'Static Page SEO',
  type: 'document',
  description:
    'SEO titles and descriptions for storefront routes that are not full CMS page documents.',
  fields: [
    pageSeoGroup('store', 'Store (/store)'),
    pageSeoGroup('journal', 'Journal index (/journal)'),
    pageSeoGroup('contact', 'Contact (/contact)'),
    pageSeoGroup('termsOfUse', 'Terms of Use (/content/terms-of-use)'),
    pageSeoGroup('privacyPolicy', 'Privacy Policy (/content/privacy-policy)'),
    pageSeoGroup('shippingPolicy', 'Shipping Policy (/content/shipping-policy)'),
    pageSeoGroup('cart', 'Cart (/cart)'),
    pageSeoGroup('checkout', 'Checkout (/checkout)'),
    pageSeoGroup('search', 'Search (/search)'),
    pageSeoGroup('notFound', '404 Not Found'),
  ],
  preview: {
    prepare() {
      return {
        title: 'Static Page SEO',
        subtitle: 'Store, journal, contact, legal, cart, checkout',
      }
    },
  },
})
