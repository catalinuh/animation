import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  sassOptions: {
    implementation: 'sass-embedded',
  },
}

export default nextConfig
