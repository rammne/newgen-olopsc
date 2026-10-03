import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.env.MIGRATE_COMMIT !== '1'
const client = getCliClient()

// admissionInfo.title/content drove the page's closing CTA; the rest of the object
// (requirements, image, cta, additionalInfo) was never rendered and duplicates the
// Admissions page, which carries per-level requirement groups including GRADE SCHOOL.
async function run() {
  console.log(DRY_RUN ? '[DRY RUN] no writes\n' : '[COMMIT] writing to production\n')

  const docs = await client.fetch<Array<Record<string, any>>>(
    '*[_type == "academicDepartment" && defined(admissionInfo)]{_id, departmentType, admissionInfo, finalCta}'
  )
  if (docs.length === 0) {
    console.log('nothing to migrate')
    return
  }

  for (const doc of docs) {
    const ai = doc.admissionInfo ?? {}
    const hasCta = doc.finalCta?.title || doc.finalCta?.content
    // finalCta only renders for Grade School; everywhere else just drop admissionInfo
    const carry =
      doc.departmentType === 'gradeSchool' && !hasCta && (ai.title || ai.content)

    const parts: string[] = []
    if (carry) parts.push('set finalCta{title,content}')
    parts.push('unset admissionInfo')

    console.log(`${doc._id.padEnd(26)} [${doc.departmentType}] ${parts.join(' + ')}`)

    if (!DRY_RUN) {
      const patch = client.patch(doc._id)
      if (carry) patch.set({finalCta: {title: ai.title, content: ai.content}})
      patch.unset(['admissionInfo'])
      await patch.commit()
    }
  }

  console.log(DRY_RUN ? '\nDry run complete. MIGRATE_COMMIT=1 to write.' : '\nDone.')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
