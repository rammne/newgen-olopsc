/**
 * Map department type to URL path (preserving original URLs for SEO)
 */
export function getDepartmentUrl(departmentType: 'preschool' | 'gradeSchool' | 'juniorHigh' | 'seniorHigh' | 'college'): string {
  const urlMap: Record<string, string> = {
    preschool: '/preschool',
    gradeSchool: '/grade-school',
    juniorHigh: '/junior-high-school',
    seniorHigh: '/senior-high-school',
    college: '/college-department',
  }
  
  return urlMap[departmentType] || '/'
}

/**
 * Map URL path to department type
 */
export function getDepartmentTypeFromUrl(path: string): 'preschool' | 'gradeSchool' | 'juniorHigh' | 'seniorHigh' | 'college' | null {
  const typeMap: Record<string, 'preschool' | 'gradeSchool' | 'juniorHigh' | 'seniorHigh' | 'college'> = {
    '/preschool': 'preschool',
    '/grade-school': 'gradeSchool',
    '/junior-high-school': 'juniorHigh',
    '/senior-high-school': 'seniorHigh',
    '/college-department': 'college',
  }
  
  return typeMap[path] || null
}

