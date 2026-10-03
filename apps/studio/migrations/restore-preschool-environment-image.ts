import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.env.MIGRATE_COMMIT !== '1'
const client = getCliClient()

// The environment section previously resolved its image through the department
// record's curriculum.image. That field is gone, so point the new singleton at
// the same asset directly.
const ASSET_ID = 'image-561a0f232efb832c70bb4fc718500d164c8eef68-6000x4000-jpg'

async function run() {
  console.log(DRY_RUN ? '[DRY RUN] no writes\n' : '[COMMIT] writing to production\n')

  const asset = await client.getDocument(ASSET_ID)
  if (!asset) {
    console.log('ABORT — asset not found: ' + ASSET_ID)
    return
  }

  const doc = await client.getDocument('preschoolPage')
  if (!doc) {
    console.log('ABORT — preschoolPage not found')
    return
  }

  const env = (doc as Record<string, any>).environment ?? {}
  if (env.image) {
    console.log('SKIP — environment.image already set')
    return
  }

  console.log(`preschoolPage  set environment.image -> ${(asset as any).originalFilename}`)

  if (!DRY_RUN) {
    await client
      .patch('preschoolPage')
      .set({
        'environment.image': {
          _type: 'image',
          asset: {_type: 'reference', _ref: ASSET_ID},
          alt: 'OLOPSC Preschool teacher reading a book to young learners',
        },
      })
      .commit()
    console.log('\nDone.')
  } else {
    console.log('\nDry run complete. MIGRATE_COMMIT=1 to write.')
  }
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
