import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.env.MIGRATE_COMMIT !== '1'
const client = getCliClient()

const TARGET_ID = 'seniorHighPage'

// Copy shown in the page today that had no CMS home (facilitiesHeader was empty,
// and the Strengthened Curriculum heading came from the outdated curriculum field).
const SECTION_TITLE = 'Specialized SHS Track Clusters'
const FACILITIES_HEADER = {
  title: 'Independence, Respected.',
  description:
    "We know you aren't kids anymore. Our Senior High environment is built on mutual respect. You will have access to modern science labs, collegiate-level library hubs, and a vibrant campus culture full of specialized clubs where your ideas are taken seriously. You have the autonomy to lead; we provide the platform.",
}

async function run() {
  console.log(DRY_RUN ? '[DRY RUN] no writes\n' : '[COMMIT] writing to production\n')

  const src = await client.fetch<Record<string, any> | null>(
    '*[_type == "academicDepartment" && departmentType == "seniorHigh"][0]'
  )
  if (!src) {
    console.log('ABORT — source seniorHigh department not found')
    return
  }

  const existing = await client.getDocument(TARGET_ID)
  if (existing) {
    console.log(`SKIP — ${TARGET_ID} already exists`)
    return
  }

  const tc = src.trackClusters ?? {}

  const doc = {
    _id: TARGET_ID,
    _type: 'seniorHighPage',
    hero: {
      headline: src.hero?.headline,
      subheadline: src.hero?.subheadline,
      backgroundImage: src.hero?.backgroundImage,
    },
    trackClusters: {
      // Section 1.5 heading previously came from the outdated `curriculum.title`
      title: SECTION_TITLE,
      intro: tc.intro,
      detailTitle: tc.title,
      subtitle: tc.subtitle,
      clusters: tc.clusters,
      note: tc.note,
      quote: tc.quote,
    },
    facilitiesHeader: src.facilitiesHeader ?? FACILITIES_HEADER,
    sectionImages: src.sectionImages,
    facilityTourImages: src.facilityTourImages,
    admissionInfo: {
      title: src.admissionInfo?.title,
      content: src.admissionInfo?.content,
    },
    seo: src.seo,
  }

  const clusterCount = doc.trackClusters.clusters?.length ?? 0
  const trackCount = (doc.trackClusters.clusters ?? []).reduce(
    (n: number, c: any) => n + (c.tracks?.length ?? 0),
    0
  )

  console.log(`create ${TARGET_ID}`)
  console.log(`  hero.headline        ${doc.hero.headline ? 'yes' : 'MISSING'}`)
  console.log(`  trackClusters        ${clusterCount} clusters / ${trackCount} tracks`)
  console.log(`  facilitiesHeader     ${src.facilitiesHeader ? 'from CMS' : 'from hardcoded fallback'}`)
  console.log(`  sectionImages        ${doc.sectionImages?.length ?? 0}`)
  console.log(`  facilityTourImages   ${doc.facilityTourImages?.length ?? 0}`)
  console.log(`  admissionInfo.title  ${doc.admissionInfo.title ? 'yes' : 'MISSING'}`)
  console.log(`  seo                  ${doc.seo ? 'yes' : 'MISSING'}`)

  if (!DRY_RUN) {
    await client.createOrReplace(doc)
    console.log('\nCreated.')
  } else {
    console.log('\nDry run complete. MIGRATE_COMMIT=1 to write.')
  }
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
