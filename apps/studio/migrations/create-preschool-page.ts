import {randomBytes} from 'node:crypto'
import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.env.MIGRATE_COMMIT !== '1'
const client = getCliClient()
const k = () => randomBytes(6).toString('hex')

const TARGET_ID = 'preschoolPage'

// Copy lifted verbatim from apps/web/src/pages/preschool.astro
const CONTENT = {
  hero: {
    headline: 'The Foundation of Lifelong Learning',
    intro:
      'The OLOPSC Preschool Department provides a nurturing, structured environment designed to develop cognitive, motor, and social skills. We offer three specialized early childhood levels: Nursery, Pre-Kinder, and Kinder.',
  },
  levels: [
    {
      _key: k(),
      name: 'Nursery',
      description:
        'Focused on foundational socialization, sensory exploration, and basic gross and fine motor skill development in a highly guided environment.',
    },
    {
      _key: k(),
      name: 'Pre-Kinder',
      description:
        'Introduces structured play, early literacy, numeracy concepts, and independence. Available in both Morning (AM) and Afternoon (PM) sessions.',
    },
    {
      _key: k(),
      name: 'Kinder',
      description:
        'The critical transition year preparing students for elementary education. Emphasizes reading readiness, mathematical reasoning, and collaborative learning.',
    },
  ],
  schedule: {
    title: 'Preschool Class Schedule',
    subtitle: 'Review the official operating hours for our Early Childhood programs.',
    rows: [
      {_key: k(), level: 'Nursery', hours: '10:00 am - 12:00 nn'},
      {_key: k(), level: 'Pre-Kinder', session: 'AM', hours: '7:30 am - 10:30 am'},
      {_key: k(), level: 'Pre-Kinder', session: 'PM', hours: '12:00 nn - 3:00 pm'},
      {_key: k(), level: 'Kinder', session: 'AM', hours: '7:30 am - 11:00 am'},
      {_key: k(), level: 'Kinder', session: 'PM', hours: '12:00 nn - 3:30 pm'},
    ],
    fridayTitle: 'Asynchronous Student Enrichment Day',
  },
  caringCulture: {
    title: 'An Extension of Your Home',
    content:
      'At OLOPSC, our early childhood educators do not just teach; they nurture. Rooted in our signature Caring Culture, we maintain low teacher-to-student ratios to ensure your child receives continuous emotional support, physical safety, and individualized guidance as they learn to navigate the world outside their family circle.',
  },
  facilities: {
    title: 'Purpose-Built for Early Childhood',
    intro:
      'Every corner of our facility is engineered for the physical safety, hygiene, and developmental scale of a growing toddler.',
    features: [
      {
        _key: k(),
        title: 'Sensory-Rich, Sanitized Classrooms',
        description:
          "Our learning spaces feature child-scaled furniture, climate control, and dedicated zones for art, reading, and play. Every surface is rigorously sanitized regularly to maintain the highest health standards for your child's developing immune system.",
      },
      {
        _key: k(),
        title: 'Enclosed, Impact-Safe Playgrounds',
        description:
          'Physical play is crucial for gross motor development. Our dedicated preschool playground features rubberized, impact-absorbing flooring and age-appropriate climbing structures, completely enclosed and constantly monitored by staff.',
      },
      {
        _key: k(),
        title: 'On-Site Clinic',
        description:
          "Our on-site clinic is staffed by nurses and school physicians to handle any health concerns. Every detail is designed to give parents absolute peace of mind regarding their child's health and safety.",
      },
    ],
  },
  environment: {
    title: 'A Dedicated Space for Little Learners',
    content:
      'Safety is our absolute priority. The OLOPSC Preschool facility operates within its own secure, self-contained zone of the Marikina campus. Our toddlers have their own dedicated restrooms, play areas, and secure entrance gates, completely isolated from K-12 and College student traffic.',
  },
  milestonesSection: {
    title: 'Clear Measurable Growth',
    items: [
      {
        _key: k(),
        title: 'Cognitive Readiness',
        text: 'Mastering alphabet tracking, foundational phonics, and basic numeric patterns preparing them directly for Grade 1.',
      },
      {
        _key: k(),
        title: 'Social Regulation',
        text: 'Learning emotional self-management, active sharing, conflict resolution, and structured teamwork with peers.',
      },
      {
        _key: k(),
        title: 'Christian Values',
        text: 'Instilling initial roots of our S-RICE framework, prioritizing kindness, respect, and spiritual awareness early.',
      },
    ],
  },
  finalCta: {
    title: 'Give Your Child the Best Start',
    content:
      'Schedule a campus visit to see our Preschool facilities firsthand, meet our caring educators, and discover why OLOPSC families have trusted us since 1978.',
  },
}

async function run() {
  console.log(DRY_RUN ? '[DRY RUN] no writes\n' : '[COMMIT] writing to production\n')

  const src = await client.fetch<Record<string, any> | null>(
    '*[_type == "academicDepartment" && departmentType == "preschool"][0]'
  )
  if (!src) {
    console.log('ABORT — source preschool department not found')
    return
  }
  if (await client.getDocument(TARGET_ID)) {
    console.log(`SKIP — ${TARGET_ID} already exists`)
    return
  }

  const doc = {
    _id: TARGET_ID,
    _type: 'preschoolPage',
    hero: {...CONTENT.hero, backgroundImage: src.hero?.backgroundImage},
    levels: CONTENT.levels,
    schedule: CONTENT.schedule,
    caringCulture: CONTENT.caringCulture,
    facilities: CONTENT.facilities,
    environment: CONTENT.environment,
    milestonesSection: CONTENT.milestonesSection,
    finalCta: CONTENT.finalCta,
    facilityTourImages: src.facilityTourImages,
    seo: src.seo,
  }

  console.log(`create ${TARGET_ID}`)
  console.log(`  hero.headline        ${doc.hero.headline ? 'yes' : 'MISSING'}`)
  console.log(`  hero.backgroundImage ${doc.hero.backgroundImage ? 'carried over' : 'MISSING'}`)
  console.log(`  levels               ${doc.levels.length}`)
  console.log(`  schedule.rows        ${doc.schedule.rows.length}`)
  console.log(`  facilities.features  ${doc.facilities.features.length}`)
  console.log(`  milestones           ${doc.milestonesSection.items.length}`)
  console.log(`  facilityTourImages   ${doc.facilityTourImages?.length ?? 0}`)
  console.log(`  seo                  ${doc.seo ? 'carried over' : 'MISSING'}`)

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
