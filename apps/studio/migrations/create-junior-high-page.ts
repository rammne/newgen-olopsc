import {randomBytes} from 'node:crypto'
import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.env.MIGRATE_COMMIT !== '1'
const client = getCliClient()
const key = () => randomBytes(6).toString('hex')

const TARGET_ID = 'juniorHighPage'

// Copy lifted verbatim from apps/web/src/pages/junior-high-school.astro
const CONTENT = {
  hero: {
    headline: 'Guiding the Teenage Years with Purpose and Passion',
    intro:
      'OLOPSC Junior High School is a DepEd-recognized and PAASCU Level III Accredited institution. We deliver a rigorous academic curriculum integrated with strong Christian values, designed to guide students through their formative adolescent years and prepare them for the demands of Senior High School.',
    objectives: [
      {
        _key: key(),
        title: 'Academic Excellence',
        description:
          'Developing critical thinkers through structured, evidence-based learning experiences.',
      },
      {
        _key: key(),
        title: 'Character Formation',
        description:
          'Mentoring students to become responsible leaders and compassionate individuals grounded in faith.',
      },
      {
        _key: key(),
        title: 'Holistic Development',
        description:
          'Fostering personal growth, social responsibility, and a lifelong commitment to community service.',
      },
    ],
  },
  journey: {
    title: 'A Four-Year Journey of Growth, Character, and Excellence',
    lead: 'Purposefully designed to prepare students for Senior High School, College, and a lifetime of success.',
    body: [
      'Success in Senior High School, College, and beyond is not achieved by chance—it is intentionally built over time. At OLOPSC Junior High School, Grades 7 to 10 are carefully designed as a four-year journey of intellectual growth, character formation, and personal development.',
      'Witness your child’s transformation—from a curious learner into a mature, capable, and responsible young adult prepared for the opportunities and challenges of the future.',
    ],
    timeline: [
      {
        _key: key(),
        grade: 'Grade 7',
        title: 'Adjustment & Discovery',
        text: 'Transitioning from Grade School requires patience. We focus on teaching organizational skills, study habits, and digital citizenship, easing them into multiple-subject structures.',
      },
      {
        _key: key(),
        grade: 'Grade 8',
        title: 'Exploration & Analysis',
        text: 'The intellectual gears shift. Students dive deeper into specialized Sciences and Algebra, moving from memorizing facts to questioning systems and conducting active research.',
      },
      {
        _key: key(),
        grade: 'Grade 9',
        title: 'Focus & Identity',
        text: 'As peer dynamics intensify, we double down on the S-RICE values. Academically, students face advanced Chemistry and tech-voc fundamentals, requiring higher discipline and focus.',
      },
      {
        _key: key(),
        grade: 'Grade 10',
        title: 'Leadership & Readiness',
        text: 'The culmination of Junior High. Students take on leadership roles in clubs, complete rigorous capstone projects, and are academically hardened to seamlessly enter the specialized Senior High School strands.',
      },
    ],
  },
  mentorship: {
    title: 'A Shield Against Peer Pressure',
    content:
      'Teenagers need boundaries they can trust. Our faculty act as active mentors, utilizing our S-RICE framework (Spirituality, Responsibility, Integrity, Caring Culture, Excellence) to create a culture of absolute accountability. We proactively address digital etiquette, emotional intelligence, and respect, ensuring the Marikina community receives citizens of profound character.',
  },
  facilitiesHeader: {
    title: 'Facilities Built for Discovery & Growth',
    description:
      'Independence requires the right environment. From adult-style science laboratories to vibrant athletic courts, our campus provides the spaces necessary for teenagers to safely experiment, collaborate, and lead.',
  },
  finalCta: {
    title: 'The Right School for the Hardest Years',
    content:
      'Your teenager deserves an institution that understands their world. Visit our campus, meet our mentors, and see why families across Marikina trust OLOPSC for Junior High School.',
  },
}

async function run() {
  console.log(DRY_RUN ? '[DRY RUN] no writes\n' : '[COMMIT] writing to production\n')

  const src = await client.fetch<Record<string, any> | null>(
    '*[_type == "academicDepartment" && departmentType == "juniorHigh"][0]'
  )
  if (!src) {
    console.log('ABORT — source juniorHigh department not found')
    return
  }

  if (await client.getDocument(TARGET_ID)) {
    console.log(`SKIP — ${TARGET_ID} already exists`)
    return
  }

  const doc = {
    _id: TARGET_ID,
    _type: 'juniorHighPage',
    hero: {...CONTENT.hero, backgroundImage: src.hero?.backgroundImage},
    journey: CONTENT.journey,
    mentorship: CONTENT.mentorship,
    facilitiesHeader: CONTENT.facilitiesHeader,
    sectionImages: src.sectionImages,
    facilityTourImages: src.facilityTourImages,
    finalCta: CONTENT.finalCta,
    seo: src.seo,
  }

  console.log(`create ${TARGET_ID}`)
  console.log(`  hero.headline        ${doc.hero.headline ? 'yes' : 'MISSING'}`)
  console.log(`  hero.objectives      ${doc.hero.objectives.length}`)
  console.log(`  hero.backgroundImage ${doc.hero.backgroundImage ? 'carried over' : 'MISSING'}`)
  console.log(`  journey.timeline     ${doc.journey.timeline.length} grades`)
  console.log(`  journey.body         ${doc.journey.body.length} paragraphs`)
  console.log(`  sectionImages        ${doc.sectionImages?.length ?? 0}`)
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
