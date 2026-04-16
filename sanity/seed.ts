/**
 * Sanity CMS Seed Script
 *
 * Migrates static data from the original XYZ London site to Sanity CMS.
 *
 * Usage:
 *   SANITY_TOKEN=<write-token> npx tsx seed.ts
 *
 * Or via npm script:
 *   SANITY_TOKEN=<write-token> npm run seed
 *
 * To get a write token:
 *   1. Go to https://sanity.io/manage/project/bff91fb2
 *   2. Navigate to API > Tokens
 *   3. Create a token with "Editor" or "Admin" permissions
 */

import { createClient } from '@sanity/client'

// Configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'bff91fb2'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_TOKEN

if (!token) {
  console.error('Error: SANITY_TOKEN environment variable is required')
  console.error('Usage: SANITY_TOKEN=<your-token> npx tsx seed.ts')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ============================================================================
// DATA DEFINITIONS
// ============================================================================

// Journal Posts - migrated from Journal.tsx
const journalPosts = [
  // Editorials
  {
    _id: 'journal-architecture-of-void',
    _type: 'journalPost',
    title: 'The Architecture of Void',
    slug: { _type: 'slug', current: 'the-architecture-of-void' },
    category: 'Theory',
    featuredShape: 'triangle',
    excerpt: 'Exploring the negative space between form and function, where identity exists in absence rather than presence.',
    publishedAt: '2026-12-01T00:00:00Z',
    isFeatured: true,
    body: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'Coming soon.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _id: 'journal-material-and-memory',
    _type: 'journalPost',
    title: 'Material & Memory',
    slug: { _type: 'slug', current: 'material-and-memory' },
    category: 'Process',
    featuredShape: 'square',
    excerpt: 'How fabric holds history. An investigation into the relationship between textile and time.',
    publishedAt: '2027-01-15T00:00:00Z',
    isFeatured: false,
    body: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'Coming soon.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _id: 'journal-post-digital-identity',
    _type: 'journalPost',
    title: 'Post-Digital Identity',
    slug: { _type: 'slug', current: 'post-digital-identity' },
    category: 'Dialogue',
    featuredShape: 'circle',
    excerpt: 'A conversation about self-expression in an age where physical and digital selves blur into one.',
    publishedAt: '2027-02-01T00:00:00Z',
    isFeatured: false,
    body: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'Coming soon.',
            marks: [],
          },
        ],
      },
    ],
  },
  // Lookbooks
  {
    _id: 'journal-collection-01-genesis',
    _type: 'journalPost',
    title: 'Collection 01: Genesis',
    slug: { _type: 'slug', current: 'collection-01-genesis' },
    category: 'Lookbook',
    featuredShape: 'trapezoid',
    excerpt: 'The inaugural collection. A visual narrative of beginnings, structures, and the birth of form.',
    publishedAt: '2026-09-01T00:00:00Z',
    isFeatured: true,
    body: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'Coming soon.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _id: 'journal-x-line-kinetic',
    _type: 'journalPost',
    title: 'X Line: Kinetic',
    slug: { _type: 'slug', current: 'x-line-kinetic' },
    category: 'Campaign',
    featuredShape: 'rhombus',
    excerpt: 'Movement captured. The X Line campaign explores form in motion.',
    publishedAt: '2027-03-01T00:00:00Z',
    isFeatured: false,
    body: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'Coming soon.',
            marks: [],
          },
        ],
      },
    ],
  },
]

// Site Settings - migrated from Hero.tsx and Footer.tsx
const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  title: 'XYZ London',
  description: 'A fashion house exploring identity through physical and digital expression.',
  heroHeadline: 'From the unknown to the known.',
  heroSubheadline: 'A fashion house exploring identity through physical and digital expression.',
  socialLinks: {
    instagram: 'https://instagram.com/xyzlondon',
    twitter: 'https://x.com/xyzlondon',
    email: 'contact@xyzwear.com',
  },
}

// Home Page - migrated from Hero.tsx, Introduction.tsx, Philosophy.tsx, ARFitSection.tsx, PrivateGate.tsx
const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  // Hero
  heroHeadline: 'From the unknown to the known.',
  heroSubheadline: 'A fashion house exploring identity through physical and digital expression.',
  heroCta: 'Explore Form',
  heroFigureLabels: {
    physical: 'Fig 01. Physical',
    digital: 'Fig 02. Digital',
  },
  // Introduction - v1 single paragraph style
  introText: 'XYZ London is a fashion house built on intent. In a world of noise, speed, and constant repetition, we choose restraint. We focus on form, premium material, and proportion — the quiet elements that shape how identity is expressed.',
  // Philosophy / Manifesto section - v1 style with 4 lines
  manifestoLines: [
    'XYZ London exists to uncover identity, not define it.',
    'We believe expression emerges through form, movement, and proportion.',
    'Physical and digital are not opposites — they are parallel expressions.',
    'The greatest discoveries are always found in the unknown.',
  ],
  philosophyCtaLabel: 'DIGITAL FORM PREVIEW',
  // AR Fit Section - v1 style
  arFitLabel: 'System v1.0',
  arFitTitle: 'Find your XYZ size & fit.',
  arFitParagraph: 'XYZ London does not size by gender. We size by body structure, movement, and proportion. Our sizing system is built on Architectural Fluidity.',
  arFitCtaLabel: 'Start Fit Analysis',
  // Private Gate - v1 dark style
  privateGateTitle: 'Private Expressions',
  privateGateParagraph: 'Our expressions are not publicly offered. Access is limited and reviewed over time.',
  privateGateButtonLabel: 'Secure Entry',
}

// About Page - migrated from About.tsx (v1 full content)
const aboutPage = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  label: 'Identity & Form',
  title: 'ABOUT US',
  leadQuote: 'XYZ London is a fashion house built on intent.',
  bodyParagraphs: [
    {
      _key: 'body-1',
      column: 'left',
      text: 'In a world of noise, speed, and constant repetition, we choose restraint. We do not chase trends or mass attention. Instead, we focus on form, premium material, and proportion — the quiet elements that shape how identity is expressed.',
    },
    {
      _key: 'body-2',
      column: 'left',
      text: 'XYZ London exists to uncover identity, not define it.',
      isHighlighted: true,
    },
    {
      _key: 'body-3',
      column: 'left',
      text: 'We believe expression emerges through form, movement, and proportion — not labels, not gender, not rules imposed from the outside.',
    },
    {
      _key: 'body-4',
      column: 'right',
      text: 'Our garments are designed beyond gender, created to move naturally across different body forms. Each piece is considered for comfort, durability, and longevity — made to be lived in, (not replaced)*.',
    },
    {
      _key: 'body-5',
      column: 'right',
      text: 'Alongside physical garments, XYZ London explores digital expression. Our virtual designs extend identity beyond physical constraints, allowing form and presence to exist in new spaces without limitation. Physical and digital are not opposites to us — they are parallel expressions of the same philosophy.',
    },
  ],
  sustainabilityNote: 'We work with premium sustainable materials and (responsible construction)*, prioritising quality over volume and intention over excess. Every decision is guided by clarity, discipline, and respect for the individual.',
  closingLine1: 'XYZ London is not about fitting in.',
  closingLine2: 'It is about standing as your original self.',
  tagline: 'From the unknown to the known.',
  seoTitle: 'About | XYZ London',
  seoDescription: 'Learn about XYZ London - a fashion house exploring identity through physical and digital expression.',
}

// AR Fit Page - migrated from ARFitPage.tsx (v1 full content)
const arFitPage = {
  _id: 'arFitPage',
  _type: 'arFitPage',
  label: 'System v1.0',
  title: 'FIND YOUR PERFECT FIT.',
  subtitle: 'Instant sizing analysis based on your unique structure.',
  subtitleLine2: 'No measuring tapes. No gender categories. Just form.',
  ctaLabel: 'Start Fit Analysis',
  philosophyHeadline: "We don't classify bodies.",
  philosophyHeadlineLine2: 'We design systems that adapt to them.',
  philosophyParagraph1: 'XYZ London does not size by gender. Our sizing system is built on Architectural Fluidity: a technical approach that uses volume, drape, and internal structure to allow garments to adapt naturally to different frames.',
  philosophyParagraph2: 'Rather than assigning identity through size labels, we invite individuals to choose how they wish to reveal their form. Fit becomes an expression, not a prescription.',
  stepsHeading: 'The Analysis Process',
  steps: [
    { _key: 'step-1', id: '01', title: 'Scan Structure', description: 'Camera-assisted analysis maps your key structural points.', shape: 'circle' },
    { _key: 'step-2', id: '02', title: 'Compute Fit', description: 'Matches your volumetric data to our architectural patterns.', shape: 'hexagon' },
    { _key: 'step-3', id: '03', title: 'Visualize', description: 'See the garment on your form in AR before you acquire.', shape: 'rhombus' },
  ],
  privacyBadge: 'Privacy Encrypted',
  privacyText: 'This experience analyses form and proportion only. No images or body data are stored on our servers.',
  versionLabel: 'System v1.0 (Beta)',
  seoTitle: 'AR Fit | XYZ London',
  seoDescription: 'Experience our collection in augmented reality. Try before you buy.',
}

// Digital Form Page - migrated from DigitalForm.tsx (v1 full content)
const digitalFormPage = {
  _id: 'digitalFormPage',
  _type: 'digitalFormPage',
  collectionLabel: 'Meta / Virtual',
  title: 'DIGITAL FORM',
  description: 'Identity beyond physical constraints. Assets for virtual environments and digital expression.',
  digitalProducts: [
    {
      _key: 'd1',
      slug: { _type: 'slug', current: 'digital-cap-v1' },
      name: 'Digital Cap V1',
      line: 'NFT / Skin',
      category: 'Headwear',
      shape: 'pentagon',
      price: 45,
      currency: 'GBP',
      isFeatured: true,
      platforms: ['Roblox', 'VRChat', 'Ready Player Me'],
    },
    {
      _key: 'd2',
      slug: { _type: 'slug', current: 'digital-cap-v2' },
      name: 'Digital Cap V2',
      line: 'NFT / Skin',
      category: 'Headwear',
      shape: 'hexagon',
      price: 45,
      currency: 'GBP',
      isFeatured: true,
      platforms: ['Roblox', 'Fortnite'],
    },
    {
      _key: 'd3',
      slug: { _type: 'slug', current: 'digital-beanie' },
      name: 'Digital Beanie',
      line: 'Accessory',
      category: 'Headwear',
      shape: 'circle',
      price: 35,
      currency: 'GBP',
      platforms: ['VRChat'],
    },
    {
      _key: 'd4',
      slug: { _type: 'slug', current: 'shell-jacket-a' },
      name: 'Shell Jacket A',
      line: 'Outerwear',
      category: 'Body',
      shape: 'trapezoid',
      price: 85,
      currency: 'GBP',
    },
    {
      _key: 'd5',
      slug: { _type: 'slug', current: 'shell-jacket-b' },
      name: 'Shell Jacket B',
      line: 'Outerwear',
      category: 'Body',
      shape: 'rhombus',
      price: 85,
      currency: 'GBP',
      isComingSoon: true,
    },
    {
      _key: 'd6',
      slug: { _type: 'slug', current: 'kinetics-sneaker' },
      name: 'Kinetics Sneaker',
      line: 'Footwear',
      category: 'Shoes',
      shape: 'triangle',
      price: 65,
      currency: 'GBP',
      isComingSoon: true,
    },
  ],
  seoTitle: 'Digital Form | XYZ London',
  seoDescription: 'Digital expressions exploring identity beyond physical constraints.',
}


// ============================================================================
// SEED FUNCTIONS
// ============================================================================

async function seedJournalPosts() {
  console.log('\n--- Seeding Journal Posts ---')

  for (const post of journalPosts) {
    try {
      await client.createOrReplace(post)
      console.log(`  [OK] ${post.title} (${post.category})`)
    } catch (error) {
      console.error(`  [FAIL] ${post.title}:`, error)
    }
  }

  console.log(`\nJournal Posts: ${journalPosts.length} documents`)
}

async function seedSiteSettings() {
  console.log('\n--- Seeding Site Settings ---')

  try {
    await client.createOrReplace(siteSettings)
    console.log(`  [OK] Site Settings`)
  } catch (error) {
    console.error(`  [FAIL] Site Settings:`, error)
  }

  console.log(`\nSite Settings: 1 document`)
}

async function seedHomePage() {
  console.log('\n--- Seeding Home Page ---')

  try {
    await client.createOrReplace(homePage)
    console.log(`  [OK] Home Page`)
  } catch (error) {
    console.error(`  [FAIL] Home Page:`, error)
  }
}

async function seedAboutPage() {
  console.log('\n--- Seeding About Page ---')

  try {
    await client.createOrReplace(aboutPage)
    console.log(`  [OK] About Page`)
  } catch (error) {
    console.error(`  [FAIL] About Page:`, error)
  }
}

async function seedArFitPage() {
  console.log('\n--- Seeding AR Fit Page ---')

  try {
    await client.createOrReplace(arFitPage)
    console.log(`  [OK] AR Fit Page`)
  } catch (error) {
    console.error(`  [FAIL] AR Fit Page:`, error)
  }
}

async function seedDigitalFormPage() {
  console.log('\n--- Seeding Digital Form Page ---')

  try {
    await client.createOrReplace(digitalFormPage)
    console.log(`  [OK] Digital Form Page`)
  } catch (error) {
    console.error(`  [FAIL] Digital Form Page:`, error)
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('='.repeat(60))
  console.log('XYZ London - Sanity CMS Seed Script')
  console.log('='.repeat(60))
  console.log(`\nProject ID: ${projectId}`)
  console.log(`Dataset: ${dataset}`)
  console.log(`API Version: 2024-01-01`)

  const startTime = Date.now()

  await seedJournalPosts()
  await seedSiteSettings()
  await seedHomePage()
  await seedAboutPage()
  await seedArFitPage()
  await seedDigitalFormPage()

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2)

  const totalDocuments = journalPosts.length + 5

  console.log('\n' + '='.repeat(60))
  console.log('SEED COMPLETE')
  console.log('='.repeat(60))
  console.log('\nDocument Summary:')
  console.log(`  - Journal Posts: ${journalPosts.length}`)
  console.log(`  - Site Settings: 1`)
  console.log(`  - Home Page: 1`)
  console.log(`  - About Page: 1`)
  console.log(`  - AR Fit Page: 1`)
  console.log(`  - Digital Form Page: 1`)
  console.log(`\nTotal documents: ${totalDocuments}`)
  console.log(`Time: ${elapsed}s`)
  console.log('\nNext steps:')
  console.log('  1. Open Sanity Studio: npm run dev')
  console.log('  2. Verify content in the CMS')
  console.log('  3. Add images via the Studio')
  console.log('  4. Update frontend components to fetch from Sanity')
}

main().catch((error) => {
  console.error('\nSeed script failed:', error)
  process.exit(1)
})
