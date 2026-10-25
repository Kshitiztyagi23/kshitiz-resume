/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const basePath = isGithubActions ? '/kshitiz-resume' : ''

const nextConfig = {
  output: 'export',
  ...(isGithubActions
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  // Exposed so plain <a href> links to /public files work under the Pages base path
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
