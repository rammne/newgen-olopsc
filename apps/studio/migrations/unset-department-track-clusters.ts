import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.env.MIGRATE_COMMIT !== '1'
const client = getCliClient()

async function run() {
  console.log(DRY_RUN ? '[DRY RUN] no writes\n' : '[COMMIT] writing to production\n')

  // Safety: the live copy now lives on seniorHighPage. Refuse to unset unless it is present there.
  const live = await client.fetch<{clusters?: unknown[]} | null>(
    '*[_type == "seniorHighPage"][0].trackClusters'
  )
  const liveClusters = Array.isArray(live?.clusters) ? live.clusters.length : 0
  if (liveClusters === 0) {
    console.log('ABORT — seniorHighPage.trackClusters is empty; not removing the only copy')
    return
  }
  console.log(`seniorHighPage.trackClusters holds ${liveClusters} clusters — safe to proceed\n`)

  const docs = await client.fetch<Array<{_id: string; trackClusters?: unknown}>>(
    '*[_type == "academicDepartment" && defined(trackClusters)]{_id, trackClusters}'
  )

  if (docs.length === 0) {
    console.log('nothing to unset')
    return
  }

  for (const doc of docs) {
    console.log(`${doc._id.padEnd(24)} unset trackClusters`)
    if (!DRY_RUN) {
      await client.patch(doc._id).unset(['trackClusters']).commit()
    }
  }

  console.log(DRY_RUN ? '\nDry run complete. MIGRATE_COMMIT=1 to write.' : '\nDone.')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
