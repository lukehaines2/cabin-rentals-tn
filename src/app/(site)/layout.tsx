import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { DemoBanner } from '@/components/layout/demo-banner'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { getServerEnv } from '@/lib/env/server'
import { resolveIndexingPolicy } from '@/lib/seo/indexing'

import '../globals.css'

const env = getServerEnv()
const indexing = resolveIndexingPolicy({
  environment:
    process.env.NODE_ENV === 'production'
      ? 'production'
      : process.env.NODE_ENV === 'test'
        ? 'test'
        : 'development',
  indexingEnabled: env.SITE_INDEXING_ENABLED,
  demoContentEnabled: env.DEMO_CONTENT_ENABLED,
})

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SERVER_URL),
  title: {
    default: 'Cabin Rentals TN',
    template: '%s | Cabin Rentals TN',
  },
  description:
    'A developing cabin discovery and property management website for Gatlinburg, Pigeon Forge, and Sevierville, Tennessee.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Cabin Rentals TN',
    description:
      'A guest-first cabin discovery demo for Gatlinburg, Pigeon Forge, and Sevierville.',
    url: '/',
    siteName: 'Cabin Rentals TN',
    type: 'website',
  },
  robots: indexing.indexable
    ? {
        index: true,
        follow: true,
      }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
        },
      },
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="public-site">
        <a
          href="#main-content"
          className="bg-primary text-primary-foreground fixed top-3 left-3 z-[60] -translate-y-24 rounded-md px-4 py-3 font-semibold shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <div className="sticky top-0 z-40">
          <DemoBanner />
          <SiteHeader />
        </div>
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
