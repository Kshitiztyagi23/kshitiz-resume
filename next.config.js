/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/kshitiz-resume',
  assetPrefix: '/kshitiz-resume',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
