import {readFileSync} from 'node:fs'
import {join, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.env.MIGRATE_COMMIT !== '1'
const client = getCliClient()

const here = dirname(fileURLToPath(import.meta.url))
const data = JSON.parse(readFileSync(join(here, 'grade-school-content.json'), 'utf8'))

async function run() {
  console.log(DRY_RUN ? '[DRY RUN] no writes\n' : '[COMMIT] writing to production\n')

  const docs = await client.fetch<Array<Record<string, any>>>(
    '*[_type == "academicDepartment" && departmentType == "gradeSchool"]{_id, keyFeatures, learningObjectives}'
  )
  if (docs.length === 0) {
    console.log('ABORT — gradeSchool department not found')
    return
  }

  for (const doc of docs) {
    const patch: Record<string, unknown> = {}

    if (!Array.isArray(doc.keyFeatures) || doc.keyFeatures.length === 0) {
      patch.keyFeatures = data.keyFeatures
    }

    const lo = doc.learningObjectives ?? {}
    const needsGeneral = !lo.generalObjective
    const needsSpecific = !Array.isArray(lo.specificObjectives) || lo.specificObjectives.length === 0
    if (needsGeneral || needsSpecific) {
      patch.learningObjectives = {
        ...lo,
        ...(needsGeneral ? {generalObjective: data.learningObjectives.generalObjective} : {}),
        ...(needsSpecific
          ? {specificObjectives: data.learningObjectives.specificObjectives}
          : {}),
      }
    }

    const keys = Object.keys(patch)
    console.log(
      `${doc._id.padEnd(24)} ${keys.length ? 'write=[' + keys.join(', ') + ']' : '(already populated)'}`
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
