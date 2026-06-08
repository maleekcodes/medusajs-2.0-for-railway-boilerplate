/**
 * One-off migration: homePage.introText string → portable text array.
 *
 * Run after deploying the rich-text schema when Studio shows
 * "Invalid property value" for Introduction Text.
 *
 * Usage:
 *   SANITY_TOKEN=<write-token> npx tsx migrate-intro-text.ts
 *
 * Dry run (no write):
 *   SANITY_TOKEN=<write-token> npx tsx migrate-intro-text.ts --dry-run
 */

import { createClient } from '@sanity/client'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'bff91fb2'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_TOKEN
const dryRun = process.argv.includes('--dry-run')

if (!token) {
  console.error('Error: SANITY_TOKEN is required')
  console.error('Usage: SANITY_TOKEN=<token> npx tsx migrate-intro-text.ts [--dry-run]')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

type PortableBlock = {
  _type: 'block'
  _key: string
  style: 'normal'
  markDefs: []
  children: {
    _type: 'span'
    _key: string
    text: string
    marks: []
  }[]
}

function stringToPortableText(text: string): PortableBlock[] {
  const normalized = text.replace(/\r\n/g, '\n').trim()
  if (!normalized) {
    return []
  }

  const parts = normalized.includes('\n\n')
    ? normalized.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    : normalized.split('\n').map((p) => p.trim()).filter(Boolean)

  return parts.map((paragraph, index) => ({
    _type: 'block',
    _key: `intro-migrated-${index}`,
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: `intro-migrated-${index}-span`,
        text: paragraph,
        marks: [],
      },
    ],
  }))
}

async function main() {
  console.log(`Project: ${projectId}  Dataset: ${dataset}`)
  if (dryRun) {
    console.log('DRY RUN — no changes will be written\n')
  }

  const doc = await client.fetch<{ _id: string; introText?: unknown } | null>(
    `*[_type == "homePage"][0]{ _id, introText }`
  )

  if (!doc?._id) {
    console.error('No homePage document found.')
    process.exit(1)
  }

  const { introText } = doc

  if (Array.isArray(introText)) {
    console.log('introText is already portable text — nothing to migrate.')
    return
  }

  if (typeof introText !== 'string' || !introText.trim()) {
    console.log('introText is empty or not a string — nothing to migrate.')
    return
  }

  const blocks = stringToPortableText(introText)
  console.log(`Converting ${blocks.length} paragraph(s):\n`)
  blocks.forEach((block, i) => {
    const text = block.children[0]?.text ?? ''
    console.log(`  [${i + 1}] ${text.slice(0, 80)}${text.length > 80 ? '…' : ''}`)
  })

  if (dryRun) {
    console.log('\nDry run complete. Re-run without --dry-run to apply.')
    return
  }

  await client.patch(doc._id).set({ introText: blocks }).commit()
  console.log('\nMigrated homePage.introText successfully.')
  console.log('Refresh Sanity Studio — the field should be editable now.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
