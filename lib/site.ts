// Prefix for files in /public, so links survive the GitHub Pages base path.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const resumeHref = `${basePath}/resume.pdf`

export const sections = [
  { id: 'experience', label: 'experience' },
  { id: 'research', label: 'research' },
  { id: 'projects', label: 'projects' },
  { id: 'skills', label: 'skills' },
  { id: 'leadership', label: 'leadership' },
  { id: 'education', label: 'education' },
] as const

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
