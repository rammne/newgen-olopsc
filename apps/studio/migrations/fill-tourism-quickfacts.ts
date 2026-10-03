import {getCliClient} from 'sanity/cli'

const client = getCliClient()

async function run() {
  const doc = await client.getDocument('tourismManagement')
  const qf = (doc?.quickFacts ?? {}) as Record<string, string>

  const patch: Record<string, string> = {}
  if (!qf.duration) patch['quickFacts.duration'] = '4 Years'
  if (!qf.units) patch['quickFacts.units'] = '156 Units'

  if (!Object.keys(patch).length) {
    console.log('nothing to fill')
    return
  }

  console.log('filling:', patch)
  await client.patch('tourismManagement').set(patch).commit()
  console.log('done')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
