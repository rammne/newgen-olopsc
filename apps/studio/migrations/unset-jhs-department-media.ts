import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.env.MIGRATE_COMMIT !== '1'
const client = getCliClient()

// Fields the Junior High department record no longer serves: its page now reads
// juniorHighPage. sectionImages is dead for every department.
const JHS_ONLY = ['sectionImages', 'facilityTourImages', 'seo']

async function run() {
  console.log(DRY_RUN ? '[DRY RUN] no writes\n' : '[COMMIT] writing to production\n')

  // Safety: only proceed if juniorHighPage actually holds the gallery now.
  const live = await client.fetch<{gallery?: number} | null>(
    '*[_type == "juniorHighPage"][0]{"gallery": count(facilityTourImages)}'
  )
  if (!live?.gallery) {
    console.log('ABORT — juniorHighPage.facilityTourImages is empty; not removing the only copy')
    return
  }
  console.log(`juniorHighPage holds ${live.gallery} gallery images — safe to proceed\n`)

  const jhs = await client.fetch<Array<{_id: string}>>(
    '*[_type == "academicDepartment" && departmentType == "juniorHigh"]{_id}'
  )
  for (const doc of jhs) {
    console.log(`${doc._id.padEnd(26)} unset ${JHS_ONLY.join(', ')}`)
    if (!DRY_RUN) await client.patch(doc._id).unset(JHS_ONLY).commit()
  }

  // sectionImages is gone from the schema entirely — clear it everywhere else too.
  const others = await client.fetch<Array<{_id: string}>>(
    '*[_type == "academicDepartment" && departmentType != "juniorHigh" && defined(sectionImages)]{_id}'
  )
  for (const doc of others) {
    console.log(`${doc._id.padEnd(26)} unset sectionImages`)
    if (!DRY_RUN) await client.patch(doc._id).unset(['sectionImages']).commit()
  }

  console.log(DRY_RUN ? '\nDry run complete. MIGRATE_COMMIT=1 to write.' : '\nDone.')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
