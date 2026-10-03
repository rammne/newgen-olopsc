import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.env.MIGRATE_COMMIT !== '1'
const client = getCliClient()

// The preschool page now reads preschoolPage; these no longer serve the department record.
const FIELDS = ['curriculum', 'facilityTourImages', 'seo']

async function run() {
  console.log(DRY_RUN ? '[DRY RUN] no writes\n' : '[COMMIT] writing to production\n')

  const live = await client.fetch<{gallery?: number; hero?: boolean} | null>(
    '*[_type == "preschoolPage"][0]{"gallery": count(facilityTourImages), "hero": defined(hero.headline)}'
  )
  if (!live?.hero) {
    console.log('ABORT — preschoolPage is not populated; refusing to clear the department record')
    return
  }
  console.log(
    `preschoolPage is populated (gallery: ${live.gallery ?? 0} images) — safe to proceed\n`
  )

  const docs = await client.fetch<Array<{_id: string}>>(
    '*[_type == "academicDepartment" && departmentType == "preschool"]{_id}'
  )
  for (const doc of docs) {
    console.log(`${doc._id.padEnd(24)} unset ${FIELDS.join(', ')}`)
    if (!DRY_RUN) await client.patch(doc._id).unset(FIELDS).commit()
  }

  console.log(DRY_RUN ? '\nDry run complete. MIGRATE_COMMIT=1 to write.' : '\nDone.')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
