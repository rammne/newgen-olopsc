import {StructureBuilder, StructureResolverContext} from 'sanity/structure'

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
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                ),
              S.listItem()
                .title('College Programs')
                .child(
                  S.documentTypeList('collegeProgram')
                    .title('College Programs')
                    .filter('_type == "collegeProgram"')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
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
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('Events')
                .child(
                  S.documentTypeList('event')
                    .title('Events')
                    .filter('_type == "event"')
                    .defaultOrdering([{field: 'startDate', direction: 'asc'}])
                ),
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
            'academicDepartment',
            'collegeProgram',
            'news',
            'event',
          ].includes(listItem.getId() || '')
      ),
    ])
}

