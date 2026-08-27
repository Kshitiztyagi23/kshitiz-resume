/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

const nextConfig = {
  output: 'export',
  ...(isGithubActions
    ? {
        basePath: '/kshitiz-resume',
        assetPrefix: '/kshitiz-resume',
      }
    : {}),
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

