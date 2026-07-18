/* THIS FILE FOLLOWS PAYLOAD'S GENERATED ADMIN PAGE. */
import config from '@payload-config'
import { generatePageMetadata, RootPage } from '@payloadcms/next/views'
import type { Metadata } from 'next'

import { importMap } from '../importMap'

type PageArguments = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<Record<string, string | string[]>>
}

export function generateMetadata({
  params,
  searchParams,
}: PageArguments): Promise<Metadata> {
  return generatePageMetadata({ config, params, searchParams })
}

export default function AdminPage({ params, searchParams }: PageArguments) {
  return RootPage({ config, params, searchParams, importMap })
}
