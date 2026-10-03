import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.env.MIGRATE_COMMIT !== '1'
const client = getCliClient()

// keyFeatures was a bare array; it becomes { title, description, items[] }.
// The section heading moves over from curriculum.title/description, which sat
// directly above the feature grid. curriculum.image/highlights were never rendered.
async function run() {
  console.log(DRY_RUN ? '[DRY RUN] no writes\n' : '[COMMIT] writing to production\n')

  const docs = await client.fetch<Array<Record<string, any>>>(
    '*[_type == "academicDepartment" && (defined(curriculum) || defined(keyFeatures))]{_id, departmentType, curriculum, keyFeatures}'
  )
  if (docs.length === 0) {
    console.log('nothing to migrate')
    return
  }

  for (const doc of docs) {
    const kf = doc.keyFeatures
    const cur = doc.curriculum ?? {}
    const isArray = Array.isArray(kf)

    const patch: Record<string, unknown> = {}
    const parts: string[] = []

    // keyFeatures only renders for Grade School; elsewhere just drop curriculum
    if (doc.departmentType === 'gradeSchool' && (isArray || cur.title || cur.description)) {
      patch.keyFeatures = {
        ...(cur.title ? {title: cur.title} : {}),
        ...(cur.description ? {description: cur.description} : {}),
        ...(isArray ? {items: kf} : kf && typeof kf === 'object' ? kf : {}),
      }
      parts.push(
        `keyFeatures{title:${cur.title ? 'y' : '-'} desc:${cur.description ? 'y' : '-'} items:${isArray ? kf.length : 0}}`
      )
    }

    const unset: string[] = []
    if (doc.curriculum) unset.push('curriculum')
    if (unset.length) parts.push('unset ' + unset.join(', '))

    if (!parts.length) {
      console.log(`${doc._id.padEnd(26)} [${doc.departmentType}] (nothing to do)`)
      continue
    }

    console.log(`${doc._id.padEnd(26)} [${doc.departmentType}] ${parts.join(' + ')}`)

    if (!DRY_RUN) {
      const tx = client.patch(doc._id)
      if (Object.keys(patch).length) tx.set(patch)
      if (unset.length) tx.unset(unset)
      await tx.commit()
    }
  }

  console.log(DRY_RUN ? '\nDry run complete. MIGRATE_COMMIT=1 to write.' : '\nDone.')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
