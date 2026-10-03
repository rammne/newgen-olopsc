import {readFileSync} from 'node:fs'
import {join, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {randomBytes} from 'node:crypto'
import {getCliClient} from 'sanity/cli'

const newKey = () => randomBytes(6).toString('hex')

function keyify(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        const obj = {...(item as Record<string, unknown>)}
        if (!obj._key) obj._key = newKey()
        for (const [k, v] of Object.entries(obj)) if (k !== '_key') obj[k] = keyify(v)
        return obj
      }
      return item
    })
  }
  if (value && typeof value === 'object') {
    const obj = {...(value as Record<string, unknown>)}
    for (const [k, v] of Object.entries(obj)) obj[k] = keyify(v)
    return obj
  }
  return value
}

const here = dirname(fileURLToPath(import.meta.url))
const data: Record<string, Record<string, unknown>> = JSON.parse(
  readFileSync(join(here, 'college-content.json'), 'utf8')
)

const DRY_RUN = process.env.MIGRATE_COMMIT !== '1'
const client = getCliClient()

async function run() {
  console.log(DRY_RUN ? '[DRY RUN] no writes will be made\n' : '[COMMIT] writing to production\n')

  for (const [docId, fields] of Object.entries(data)) {
    const existing = await client.getDocument(docId)
    if (!existing) {
      console.log(`SKIP  ${docId} — document not found`)
      continue
    }

    const patch: Record<string, unknown> = {}
    const skipped: string[] = []

    for (const [key, value] of Object.entries(fields)) {
      const current = (existing as Record<string, unknown>)[key]
      const isEmpty =
        current === undefined ||
        current === null ||
        (Array.isArray(current) && current.length === 0)

      if (isEmpty) patch[key] = keyify(value)
      else skipped.push(key)
    }

    const willWrite = Object.keys(patch)
    console.log(
      `${docId.padEnd(22)} write=[${willWrite.join(', ') || '-'}]` +
        (skipped.length ? `  already-populated=[${skipped.join(', ')}]` : '')
    )

    if (!DRY_RUN && willWrite.length) {
      await client.patch(docId).set(patch).commit()
    }
  }

  console.log(DRY_RUN ? '\nDry run complete. Re-run with --commit to write.' : '\nDone.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
