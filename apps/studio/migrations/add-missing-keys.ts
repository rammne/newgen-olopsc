import {randomBytes} from 'node:crypto'
import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.env.MIGRATE_COMMIT !== '1'
const client = getCliClient()

const DOCS = [
  'psychology',
  'computingStudies',
  'tourismManagement',
  'hospitalityManagement',
  'businessAdmin',
  'educationLiberalArts',
]

const FIELDS = ['outcomes', 'curriculum', 'curriculumTracks', 'tracks', 'pathways', 'faculty']

const newKey = () => randomBytes(6).toString('hex')

let added = 0

function keyify(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        const obj = item as Record<string, unknown>
        const out: Record<string, unknown> = {...obj}
        if (!out._key) {
          out._key = newKey()
          added++
        }
        for (const [k, v] of Object.entries(out)) {
          if (k !== '_key') out[k] = keyify(v)
        }
        return out
      }
      return item
    })
  }
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>
    const out: Record<string, unknown> = {...obj}
    for (const [k, v] of Object.entries(out)) out[k] = keyify(v)
    return out
  }
  return value
}

async function run() {
  console.log(DRY_RUN ? '[DRY RUN] no writes\n' : '[COMMIT] writing to production\n')

  for (const docId of DOCS) {
    const doc = await client.getDocument(docId)
    if (!doc) {
      console.log(`SKIP  ${docId} — not found`)
      continue
    }

    const before = added
    const patch: Record<string, unknown> = {}

    for (const field of FIELDS) {
      const value = (doc as Record<string, unknown>)[field]
      if (!Array.isArray(value) || value.length === 0) continue
      const fixed = keyify(value)
      if (JSON.stringify(fixed) !== JSON.stringify(value)) patch[field] = fixed
    }

    const fields = Object.keys(patch)
    console.log(`${docId.padEnd(22)} keys-added=${added - before}` + (fields.length ? `  fields=[${fields.join(', ')}]` : '  (already keyed)'))

    if (!DRY_RUN && fields.length) {
      await client.patch(docId).set(patch).commit()
    }
  }

  console.log(`\n${added} keys ${DRY_RUN ? 'would be' : ''} added.`)
  if (DRY_RUN) console.log('Re-run with MIGRATE_COMMIT=1 to write.')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
