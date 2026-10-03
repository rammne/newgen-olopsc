import {randomBytes} from 'node:crypto'
import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.env.MIGRATE_COMMIT !== '1'
const client = getCliClient()
const key = () => randomBytes(6).toString('hex')

// Lifted verbatim from the hardcoded JSX in apps/web/src/pages/senior-high-school.astro
const trackClusters = {
  title: 'Tailored Pathways for Every Ambition',
  intro:
    'We offer Academic and TechPro Track Clusters designed to help students prepare for college and their future careers.',
  subtitle:
    'Choose the exact curriculum that aligns with your dream university course or immediate career goals.',
  clusters: [
    {
      _key: key(),
      name: 'Academic Track Clusters',
      tracks: [
        {
          _key: key(),
          name: 'Arts, Social Sciences and Humanities (ASSH)',
          description:
            'Nurtures critical thinking, effective communication, and a deeper understanding of society and human behavior. Learners engage in the study of literature, social sciences, philosophy, culture, media, and the arts.',
          skills: 'Research, analysis, leadership, and advocacy.',
          outcomes:
            'Education, law, public service, psychology, communication, journalism, creative industries, and other humanities-related fields.',
        },
        {
          _key: key(),
          name: 'Business and Entrepreneurship (BAE)',
          description:
            'Prepares students to become innovative thinkers, future business leaders, and entrepreneurial problem-solvers in an increasingly dynamic economy.',
          skills:
            'Business management, marketing, finance, entrepreneurship, organizational leadership, creativity, strategic thinking, and decision-making.',
          outcomes:
            'Success in business and enterprise through practical and experiential learning.',
        },
        {
          _key: key(),
          name: 'Science, Technology, Engineering and Mathematics (STEM)',
          description:
            'Provides a strong foundation in science, mathematics, technology, and innovation. Students engage in advanced learning experiences that strengthen their understanding of real-world scientific applications.',
          skills:
            'Analytical thinking, problem-solving, scientific inquiry, research capabilities, and technical competencies.',
          outcomes:
            'Rigorous university programs and careers that drive innovation and technological advancement.',
        },
      ],
    },
    {
      _key: key(),
      name: 'TECHPRO Track Clusters',
      description:
        'An aggressive, hands-on pipeline designed for highly specialized technical skills, NC II certifications, and direct entry into tech or hospitality sectors.',
      tracks: [
        {
          _key: key(),
          name: 'Hospitality and Tourism (HT)',
          description:
            "Equips students with the professionalism and customer service excellence required in one of the world's fastest-growing industries.",
          skills:
            'Hospitality operations, tourism management, event coordination, travel services, guest relations, adaptability, and service-oriented competencies.',
          outcomes:
            'Confidence and practical knowledge valued in both local and international settings through industry-aligned training and experiential activities.',
        },
        {
          _key: key(),
          name: 'Information and Communications Technology (ICT)',
          description:
            'Empowers students to thrive in the digital age by developing technical skills in computing, programming, digital systems, and emerging technologies.',
          skills: 'Problem-solving, innovation, and digital literacy skills.',
          outcomes:
            'Technology-driven careers and further studies in computing and related disciplines.',
        },
      ],
    },
  ],
  note: 'Our program combines classroom learning with hands-on skills and character building. This ensures that OLOPSC graduates are ready for college, work, or starting their own business.',
  quote:
    'At OLOPSC Senior High School, we help every student find their passion and become ready for the future.',
}

async function run() {
  console.log(DRY_RUN ? '[DRY RUN] no writes\n' : '[COMMIT] writing to production\n')

  const docs = await client.fetch<Array<{_id: string; trackClusters?: unknown}>>(
    '*[_type == "academicDepartment" && departmentType == "seniorHigh"]{_id, trackClusters}'
  )

  if (docs.length !== 1) {
    console.log(`ABORT — matched ${docs.length} seniorHigh documents`)
    return
  }

  const doc = docs[0]
  const existing = doc.trackClusters as {clusters?: unknown[]} | undefined
  const hasClusters = Array.isArray(existing?.clusters) && existing.clusters.length > 0

  if (hasClusters) {
    console.log(`SKIP  ${doc._id} — trackClusters.clusters already populated`)
    return
  }

  const totalTracks = trackClusters.clusters.reduce((n, c) => n + c.tracks.length, 0)
  console.log(
    `${doc._id}  write=trackClusters (${trackClusters.clusters.length} clusters, ${totalTracks} tracks)`
  )

  if (!DRY_RUN) {
    await client.patch(doc._id).set({trackClusters}).commit()
  }

  console.log(DRY_RUN ? '\nDry run complete. MIGRATE_COMMIT=1 to write.' : '\nDone.')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
