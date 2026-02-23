// Objects
import { seo } from './objects/seo'
import { hero } from './objects/hero'
import { cta } from './objects/cta'
import { feature } from './objects/feature'
import { testimonial } from './objects/testimonial'
import { stats } from './objects/stats'
import { imageWithCaption } from './objects/imageWithCaption'
import { videoEmbed } from './objects/videoEmbed'
import { section } from './objects/section'
import { facultyMember } from './objects/facultyMember'
import { timeline } from './objects/timeline'
import { gallery } from './objects/gallery'
import { contactInfo } from './objects/contactInfo'
import { formField } from './objects/formField'
import { socialLink } from './objects/socialLink'
import { portableText } from './objects/portableText'

// Documents
import { academicDepartment } from './documents/academicDepartment'
import { collegeProgram } from './documents/collegeProgram'
import { news } from './documents/news'
import { event } from './documents/event'
import { sdg } from './documents/sdg'

// Singletons
import { homePage } from './singletons/homePage'
import { admissionsPage } from './singletons/admissionsPage'
import { scholarshipPage } from './singletons/scholarshipPage'
import { contactPage } from './singletons/contactPage'
import { jobsPage } from './singletons/jobsPage'
import { settings } from './singletons/settings'
import { aboutPage } from './singletons/aboutPage'
import { sdgPage } from './singletons/sdgPage'
import { alumniPage } from './singletons/alumniPage'

// College Programs (Fixed Singletons)
import { tourismManagement } from './college/tourismManagement'
import { hospitalityManagement } from './college/hospitalityManagement'
import { businessAdmin } from './college/businessAdmin'
import { educationLiberalArts } from './college/educationLiberalArts'
import { computingStudies } from './college/computingStudies'

export const schemaTypes = [
  // Objects
  seo,
  hero,
  cta,
  feature,
  testimonial,
  stats,
  imageWithCaption,
  videoEmbed,
  section,
  facultyMember,
  timeline,
  gallery,
  contactInfo,
  formField,
  socialLink,
  portableText,
  // Documents
  academicDepartment,
  collegeProgram,
  news,
  event,
  sdg,
  // Singletons
  homePage,
  aboutPage,
  admissionsPage,
  scholarshipPage,
  contactPage,
  jobsPage,
  settings,
  sdgPage,
  alumniPage,
  // College Programs
  tourismManagement,
  hospitalityManagement,
  businessAdmin,
  educationLiberalArts,
  computingStudies,
]
