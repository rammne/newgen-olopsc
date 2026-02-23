import { StructureBuilder, StructureResolverContext } from 'sanity/structure'
import {
  Home,
  FileText,
  Info,
  GraduationCap,
  Award,
  Phone,
  Briefcase,
  Users,
  School,
  BookOpen,
  Newspaper,
  Calendar,
  Globe,
  Settings,
  Monitor,
} from 'lucide-react'

export const structure = (S: StructureBuilder, context: StructureResolverContext) => {
  return S.list()
    .title('Content')
    .items([
      // Pages (Singletons)
      S.listItem()
        .title('Pages')
        .icon(FileText)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .icon(Home)
                .child(S.document().schemaType('homePage').documentId('homePage')),
              S.listItem()
                .title('About Page')
                .icon(Info)
                .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
              S.listItem()
                .title('Admissions Page')
                .icon(GraduationCap)
                .child(S.document().schemaType('admissionsPage').documentId('admissionsPage')),
              S.listItem()
                .title('Scholarship Programs Page')
                .icon(Award)
                .child(S.document().schemaType('scholarshipPage').documentId('scholarshipPage')),
              S.listItem()
                .title('Contact Page')
                .icon(Phone)
                .child(S.document().schemaType('contactPage').documentId('contactPage')),
              S.listItem()
                .title('Jobs/Careers Page')
                .icon(Briefcase)
                .child(S.document().schemaType('jobsPage').documentId('jobsPage')),
              S.listItem()
                .title('Alumni Page')
                .icon(Users)
                .child(S.document().schemaType('alumniPage').documentId('alumniPage')),
            ])
        ),
      // Academic Content
      S.listItem()
        .title('Academic')
        .icon(School)
        .child(
          S.list()
            .title('Academic')
            .items([
              S.listItem()
                .title('Academic Departments')
                .icon(School)
                .child(
                  S.documentTypeList('academicDepartment')
                    .title('Academic Departments')
                    .filter('_type == "academicDepartment"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              S.listItem()
                .title('College Programs')
                .icon(BookOpen)
                .child(
                  S.list()
                    .title('College Programs')
                    .items([
                      S.listItem()
                        .title('Tourism Management')
                        .icon(GraduationCap)
                        .child(S.document().schemaType('tourismManagement').documentId('tourismManagement')),
                      S.listItem()
                        .title('Hospitality Management')
                        .icon(GraduationCap)
                        .child(S.document().schemaType('hospitalityManagement').documentId('hospitalityManagement')),
                      S.listItem()
                        .title('Business Administration & Entrepreneurship')
                        .icon(GraduationCap)
                        .child(S.document().schemaType('businessAdmin').documentId('businessAdmin')),
                      S.listItem()
                        .title('Education & Liberal Arts')
                        .icon(GraduationCap)
                        .child(S.document().schemaType('educationLiberalArts').documentId('educationLiberalArts')),
                      S.listItem()
                        .title('Computing Studies')
                        .icon(Monitor)
                        .child(S.document().schemaType('computingStudies').documentId('computingStudies')),
                    ])
                ),
            ])
        ),
      // News & Events
      S.listItem()
        .title('News & Events')
        .icon(Newspaper)
        .child(
          S.list()
            .title('News & Events')
            .items([
              S.listItem()
                .title('News Articles')
                .icon(Newspaper)
                .child(
                  S.documentTypeList('news')
                    .title('News Articles')
                    .filter('_type == "news"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('Events')
                .icon(Calendar)
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
        .icon(Globe)
        .child(
          S.list()
            .title('SDGs / Advocacy')
            .items([
              S.listItem()
                .title('Sustainable Development Goals')
                .icon(Globe)
                .child(
                  S.documentTypeList('sdg')
                    .title('Sustainable Development Goals')
                    .filter('_type == "sdg"')
                    .defaultOrdering([{ field: 'number', direction: 'asc' }])
                ),
              S.listItem()
                .title('SDG Page Settings')
                .icon(Globe)
                .child(S.document().schemaType('sdgPage').documentId('sdgPage')),
            ])
        ),
      // Settings
      S.listItem()
        .title('Settings')
        .icon(Settings)
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
