import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.env.MIGRATE_COMMIT !== '1'
const client = getCliClient()

// Values lifted verbatim from the degreeMatrix array in apps/web/src/pages/college.astro,
// preserving the existing on-page order.
const MATRIX: Array<{slug: string; tags: string[]; displayOrder: number}> = [
  {slug: 'computing-studies', tags: ['BSCS', 'ACT'], displayOrder: 1},
  {
    slug: 'business-administration-and-entrepreneurship',
    tags: ['BSBA-HRM', 'BSBA-MM', 'BSE'],
    displayOrder: 2,
  },
  {slug: 'education-and-liberal-arts', tags: ['BEED', 'BSED', 'AB English'], displayOrder: 3},
  {slug: 'hospitality-management', tags: ['BSHM'], displayOrder: 4},
  {slug: 'tourism-management', tags: ['BSTM'], displayOrder: 5},
  {slug: 'psychology', tags: ['BSP'], displayOrder: 6},
]

async function run() {
  console.log(DRY_RUN ? '[DRY RUN] no writes\n' : '[COMMIT] writing to production\n')

  for (const entry of MATRIX) {
    const docs = await client.fetch<Array<{_id: string; tags?: string[]; displayOrder?: number}>>(
      '*[_type == "collegeProgram" && slug.current == $slug]{_id, tags, displayOrder}',
      {slug: entry.slug}
    )

    if (docs.length !== 1) {
      console.log(`SKIP  ${entry.slug} — matched ${docs.length} documents`)
      continue
    }

    const doc = docs[0]
    const patch: Record<string, unknown> = {}
    if (!doc.tags || doc.tags.length === 0) patch.tags = entry.tags
    if (doc.displayOrder === undefined || doc.displayOrder === null) {
      patch.displayOrder = entry.displayOrder
    }

    const keys = Object.keys(patch)
    console.log(
      `${entry.slug.padEnd(46)} ${keys.length ? `write=[${keys.join(', ')}]` : '(already set)'}`
    )

    if (!DRY_RUN && keys.length) {
      await client.patch(doc._id).set(patch).commit()
    }
  }

  console.log(DRY_RUN ? '\nDry run complete. MIGRATE_COMMIT=1 to write.' : '\nDone.')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
