// Prefix for files in /public, so links survive the GitHub Pages base path.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const resumeHref = `${basePath}/Kshitiz_Tyagi_Resume.pdf`

export const sections = [
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'research', label: 'research' },
  { id: 'about', label: 'about' },
  { id: 'contact', label: 'contact' },
] as const

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
