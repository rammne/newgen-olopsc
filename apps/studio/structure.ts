import { StructureBuilder, StructureResolverContext } from 'sanity/structure'

export const structure = (S: StructureBuilder, context: StructureResolverContext) => {
  return S.list()
    .title('Content')
    .items([
      // Pages (Singletons)
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .child(S.document().schemaType('homePage').documentId('homePage')),
              S.listItem()
                .title('About Page')
                .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
              S.listItem()
                .title('Admissions Page')
                .child(S.document().schemaType('admissionsPage').documentId('admissionsPage')),
              S.listItem()
                .title('Scholarship Programs Page')
                .child(S.document().schemaType('scholarshipPage').documentId('scholarshipPage')),
              S.listItem()
                .title('Contact Page')
                .child(S.document().schemaType('contactPage').documentId('contactPage')),
              S.listItem()
                .title('Jobs/Careers Page')
                .child(S.document().schemaType('jobsPage').documentId('jobsPage')),
              S.listItem()
                .title('Alumni Page')
                .child(S.document().schemaType('alumniPage').documentId('alumniPage')),
            ])
        ),
      // Academic Content
      S.listItem()
        .title('Academic')
        .child(
          S.list()
            .title('Academic')
            .items([
              S.listItem()
                .title('Academic Departments')
                .child(
                  S.documentTypeList('academicDepartment')
                    .title('Academic Departments')
                    .filter('_type == "academicDepartment"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              S.listItem()
                .title('College Programs')
                .child(
                  S.list()
                    .title('College Programs')
                    .items([
                      S.listItem()
                        .title('Tourism Management')
                        .child(S.document().schemaType('tourismManagement').documentId('tourismManagement')),
                      S.listItem()
                        .title('Hospitality Management')
                        .child(S.document().schemaType('hospitalityManagement').documentId('hospitalityManagement')),
                      S.listItem()
                        .title('Business Administration & Entrepreneurship')
                        .child(S.document().schemaType('businessAdmin').documentId('businessAdmin')),
                      S.listItem()
                        .title('Education & Liberal Arts')
                        .child(S.document().schemaType('educationLiberalArts').documentId('educationLiberalArts')),
                      S.listItem()
                        .title('Computing Studies')
                        .child(S.document().schemaType('computingStudies').documentId('computingStudies')),
                    ])
                ),
            ])
        ),
      // News & Events
      S.listItem()
        .title('News & Events')
        .child(
          S.list()
            .title('News & Events')
            .items([
              S.listItem()
                .title('News Articles')
                .child(
                  S.documentTypeList('news')
                    .title('News Articles')
                    .filter('_type == "news"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('Events')
                .child(
                  S.documentTypeList('event')
                    .title('Events')
                    .filter('_type == "event"')
                    .defaultOrdering([{ field: 'startDate', direction: 'asc' }])
                ),
            ])
        ),
      // SDGs
      S.listItem()
        .title('SDGs / Advocacy')
        .child(
          S.list()
            .title('SDGs / Advocacy')
            .items([
              S.listItem()
                .title('Sustainable Development Goals')
                .child(
                  S.documentTypeList('sdg')
                    .title('Sustainable Development Goals')
                    .filter('_type == "sdg"')
                    .defaultOrdering([{ field: 'number', direction: 'asc' }])
                ),
              S.listItem()
                .title('SDG Page Settings')
                .child(S.document().schemaType('sdgPage').documentId('sdgPage')),
            ])
        ),
      // Settings
      S.listItem()
        .title('Settings')
        .child(S.document().schemaType('settings').documentId('settings')),
      // All Documents (fallback)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'homePage',
            'aboutPage',
            'admissionsPage',
            'scholarshipPage',
            'contactPage',
            'jobsPage',
            'settings',
            'alumniPage',
            'academicDepartment',
            'collegeProgram',
            'news',
            'event',
            'sdg',
            'sdgPage',
            // College Singletons
            'tourismManagement',
            'hospitalityManagement',
            'businessAdmin',
            'educationLiberalArts',
            'computingStudies',
          ].includes(listItem.getId() || '')
      ),
    ])
}

