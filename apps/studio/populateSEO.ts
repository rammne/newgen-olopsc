/**
 * SEO Migration Script
 * Pre-populates all pages in Sanity with high-quality SEO content.
 * 
 * Usage:  cd apps/studio && npx sanity exec populateSEO.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

// ─── SEO Content for Singleton Pages ────────────────────────────────────

const singletonSEO: Record<string, { _type: string; documentId: string; title: string; description: string; keywords: string[] }> = {
    homePage: {
        _type: 'homePage',
        documentId: 'homePage',
        title: 'Official Website',
        description:
            'Our Lady of Perpetual Succor College (OLOPSC) — A premier Catholic educational institution in Marikina City offering quality education from Preschool to College. Enroll now and be part of the OLOPSC family.',
        keywords: [
            'OLOPSC',
            'Our Lady of Perpetual Succor College',
            'Marikina school',
            'Catholic school Marikina',
            'best school Marikina City',
            'preschool to college Marikina',
            'private school Philippines',
        ],
    },
    aboutPage: {
        _type: 'aboutPage',
        documentId: 'aboutPage',
        title: 'About Us',
        description:
            'Discover the history, mission, vision, and core values of Our Lady of Perpetual Succor College. Over decades of academic excellence, OLOPSC has empowered students with SRICe values in Marikina City.',
        keywords: [
            'about OLOPSC',
            'OLOPSC history',
            'OLOPSC mission vision',
            'Catholic school values',
            'Marikina college about',
            'SRICe values',
        ],
    },
    admissionsPage: {
        _type: 'admissionsPage',
        documentId: 'admissionsPage',
        title: 'Admissions',
        description:
            'Apply to OLOPSC today! Learn about our admissions process, enrollment requirements, schedules, tuition fees, and payment options for Preschool through College programs.',
        keywords: [
            'OLOPSC admissions',
            'enrollment OLOPSC',
            'how to enroll OLOPSC',
            'Marikina school enrollment',
            'OLOPSC requirements',
            'OLOPSC tuition',
            'apply OLOPSC',
        ],
    },
    scholarshipPage: {
        _type: 'scholarshipPage',
        documentId: 'scholarshipPage',
        title: 'Scholarship Programs',
        description:
            'Explore scholarship opportunities and financial aid programs at OLOPSC. We offer academic, athletic, and need-based scholarships to deserving students from Preschool to College.',
        keywords: [
            'OLOPSC scholarship',
            'scholarship Marikina',
            'financial aid OLOPSC',
            'academic scholarship Philippines',
            'OLOPSC grants',
            'free tuition Marikina',
        ],
    },
    contactPage: {
        _type: 'contactPage',
        documentId: 'contactPage',
        title: 'Contact Us',
        description:
            'Get in touch with Our Lady of Perpetual Succor College. Visit us on Gen. Ordoñez St., Concepcion Dos, Marikina City or call us at (+632) 8997-7777. We are happy to help!',
        keywords: [
            'contact OLOPSC',
            'OLOPSC address',
            'OLOPSC phone number',
            'OLOPSC email',
            'Marikina school contact',
            'OLOPSC location',
        ],
    },
    jobsPage: {
        _type: 'jobsPage',
        documentId: 'jobsPage',
        title: 'Careers',
        description:
            'Join the OLOPSC team! Browse current job openings for teachers, staff, and administrators. Build your career at Our Lady of Perpetual Succor College in Marikina City.',
        keywords: [
            'OLOPSC jobs',
            'careers OLOPSC',
            'teaching jobs Marikina',
            'OLOPSC hiring',
            'school jobs Philippines',
            'teacher vacancy Marikina',
        ],
    },
    alumniPage: {
        _type: 'alumniPage',
        documentId: 'alumniPage',
        title: 'Alumni',
        description:
            'Welcome to the OLOPSC Alumni Association. Reconnect with fellow graduates, stay updated on alumni events, and continue supporting the OLOPSCian community.',
        keywords: [
            'OLOPSC alumni',
            'OLOPSC alumni association',
            'OLOPSCian graduates',
            'OLOPSC homecoming',
            'alumni network Marikina',
        ],
    },
    sdgPage: {
        _type: 'sdgPage',
        documentId: 'sdgPage',
        title: 'Our SDG Commitments',
        description:
            'OLOPSC is committed to the United Nations Sustainable Development Goals. Learn how our programs, research, and community outreach contribute to a better future.',
        keywords: [
            'OLOPSC SDG',
            'sustainable development goals OLOPSC',
            'OLOPSC community outreach',
            'school sustainability Philippines',
        ],
    },
}

// ─── SEO Content for College Program Pages (Singletons) ──────────────

const collegeProgramSEO: Record<string, { documentId: string; title: string; description: string; keywords: string[] }> = {
    computingStudies: {
        documentId: 'computingStudies',
        title: 'College of Computing Studies',
        description:
            'Pursue a BS in Computer Science or Information Technology at OLOPSC. Our computing studies program prepares students for careers in software development, cybersecurity, data science, and IT management.',
        keywords: [
            'OLOPSC computer science',
            'OLOPSC IT course',
            'computing studies Marikina',
            'BS Computer Science Philippines',
            'BSIT OLOPSC',
            'programming course Marikina',
        ],
    },
    tourismManagement: {
        documentId: 'tourismManagement',
        title: 'Tourism Management',
        description:
            'Earn a BS in Tourism Management at OLOPSC. Develop skills in travel operations, destination planning, and tourism marketing with on-the-job training at top industry partners.',
        keywords: [
            'OLOPSC tourism management',
            'BS Tourism Marikina',
            'tourism course Philippines',
            'travel management OLOPSC',
            'tourism degree Philippines',
        ],
    },
    hospitalityManagement: {
        documentId: 'hospitalityManagement',
        title: 'Hospitality Management',
        description:
            'Study BS in Hospitality Management at OLOPSC. Gain hands-on experience in hotel operations, food service, and events management with industry-linked training programs.',
        keywords: [
            'OLOPSC hospitality management',
            'BS Hospitality Marikina',
            'hotel management Philippines',
            'BSHM OLOPSC',
            'hospitality course Philippines',
        ],
    },
    businessAdmin: {
        documentId: 'businessAdmin',
        title: 'Business Administration & Entrepreneurship',
        description:
            'Study Business Administration and Entrepreneurship at OLOPSC. Develop leadership, marketing, finance, and entrepreneurial skills for a successful career in the business world.',
        keywords: [
            'OLOPSC business administration',
            'entrepreneurship OLOPSC',
            'BSBA Marikina',
            'business course Philippines',
            'MBA preparation OLOPSC',
        ],
    },
    educationLiberalArts: {
        documentId: 'educationLiberalArts',
        title: 'Education & Liberal Arts',
        description:
            'Become a licensed professional teacher with a degree in Education from OLOPSC. Our program covers elementary and secondary education with practical teaching immersions.',
        keywords: [
            'OLOPSC education course',
            'BSEd OLOPSC',
            'teacher education Marikina',
            'liberal arts Philippines',
            'education degree Philippines',
            'BEEd OLOPSC',
        ],
    },
}

// ─── SEO Content for Academic Departments (by departmentType) ────────

const academicDeptSEO: Record<string, { title: string; description: string; keywords: string[] }> = {
    preschool: {
        title: 'Preschool Department',
        description:
            'Give your child the best start at OLOPSC Preschool. Our nurturing, play-based curriculum develops literacy, numeracy, creativity, and social skills in a safe Catholic learning environment in Marikina City.',
        keywords: [
            'OLOPSC preschool',
            'preschool Marikina',
            'kindergarten Marikina City',
            'best preschool Marikina',
            'Catholic preschool Philippines',
            'early childhood education',
        ],
    },
    gradeSchool: {
        title: 'Grade School Department',
        description:
            'OLOPSC Grade School offers a well-rounded K-12 elementary education. Our holistic curriculum integrates academics, values formation, and extracurricular activities for students in Marikina City.',
        keywords: [
            'OLOPSC grade school',
            'elementary school Marikina',
            'grade school Marikina City',
            'best elementary school Marikina',
            'Catholic grade school',
            'K-12 elementary Philippines',
        ],
    },
    juniorHigh: {
        title: 'Junior High School Department',
        description:
            'Prepare for academic excellence at OLOPSC Junior High School. Our K-12 compliant curriculum covers Grades 7-10 with strong foundations in science, math, language, and values education.',
        keywords: [
            'OLOPSC junior high school',
            'JHS Marikina',
            'junior high school Marikina City',
            'best junior high Marikina',
            'K-12 junior high Philippines',
            'Catholic high school',
        ],
    },
    seniorHigh: {
        title: 'Senior High School Department',
        description:
            'Choose your future at OLOPSC Senior High School. We offer Academic Track (STEM, ABM, HUMSS) and Tech-Voc Track (ICT, Home Economics) strands with career-ready programs in Marikina City.',
        keywords: [
            'OLOPSC senior high school',
            'SHS Marikina',
            'senior high school Marikina City',
            'STEM strand Marikina',
            'ABM strand OLOPSC',
            'HUMSS OLOPSC',
            'ICT strand Marikina',
            'K-12 senior high Philippines',
        ],
    },
    college: {
        title: 'College Department',
        description:
            'Pursue higher education at OLOPSC College Department. We offer CHED-recognized degree programs in Computing Studies, Business Administration, Hospitality, Tourism, and Education.',
        keywords: [
            'OLOPSC college',
            'college Marikina',
            'college courses OLOPSC',
            'degree programs Marikina',
            'CHED recognized school Marikina',
            'affordable college Philippines',
        ],
    },
}

// ─── Helper: patch a single document's SEO field ────────────────────

async function patchDocumentSEO(
    docId: string,
    docType: string,
    seo: { title: string; description: string; keywords: string[]; noindex?: boolean },
    label: string
) {
    try {
        // Ensure the document exists (creates it if it doesn't, leaves it alone if it does)
        await client.createIfNotExists({ _id: docId, _type: docType })

        // Patch the SEO field
        await client
            .patch(docId)
            .set({
                seo: {
                    title: seo.title,
                    description: seo.description,
                    keywords: seo.keywords,
                    noindex: seo.noindex ?? false,
                },
            })
            .commit()

        console.log(`  ✅ ${label}`)
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        console.error(`  ❌ ${label}: ${msg}`)
    }
}

// ─── Main Runner ─────────────────────────────────────────────────────

async function run() {
    console.log('🚀 Starting SEO content migration...\n')

    // 1️⃣  Singleton pages
    console.log('── Singleton Pages ──')
    for (const [key, data] of Object.entries(singletonSEO)) {
        await patchDocumentSEO(data.documentId, data._type, data, data.title)
    }

    // 2️⃣  College programs (fixed singletons)
    console.log('\n── College Programs ──')
    for (const [key, data] of Object.entries(collegeProgramSEO)) {
        await patchDocumentSEO(data.documentId, key, data, data.title)
    }

    // 3️⃣  Academic departments (query for document IDs)
    console.log('\n── Academic Departments ──')
    const departments = await client.fetch<
        { _id: string; _type: string; departmentType: string; title: string }[]
    >(`*[_type == "academicDepartment"]{ _id, _type, departmentType, title }`)

    if (!departments || departments.length === 0) {
        console.log('  ⚠️  No academic departments found — skipping.')
    } else {
        for (const dept of departments) {
            const seo = academicDeptSEO[dept.departmentType]
            if (seo) {
                await patchDocumentSEO(dept._id, dept._type, seo, `${dept.title} (${dept.departmentType})`)
            } else {
                console.log(`  ⏭️  ${dept.title} — no SEO mapping for "${dept.departmentType}"`)
            }
        }
    }

    console.log('\n🎉 SEO migration complete! All pages now have SEO metadata.')
    console.log('💡 Tip: Open Sanity Studio → go to each page → click the SEO tab to review.\n')
}

run()
