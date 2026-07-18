import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { getServerEnv } from './lib/env/server'
import { Amenities } from './payload/collections/Amenities'
import { GuestEnquiries } from './payload/collections/GuestEnquiries'
import { Locations } from './payload/collections/Locations'
import { Media } from './payload/collections/Media'
import { Properties } from './payload/collections/Properties'
import { PropertyTypes } from './payload/collections/PropertyTypes'
import { Users } from './payload/collections/Users'
import { SiteSettings } from './payload/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const env = getServerEnv()

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— DEEP',
    },
  },
  collections: [
    Users,
    Media,
    Locations,
    Amenities,
    PropertyTypes,
    Properties,
    GuestEnquiries,
  ],
  cors: [env.NEXT_PUBLIC_SERVER_URL],
  csrf: [env.NEXT_PUBLIC_SERVER_URL],
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL,
    },
  }),
  editor: lexicalEditor(),
  globals: [SiteSettings],
  secret: env.PAYLOAD_SECRET,
  serverURL: env.NEXT_PUBLIC_SERVER_URL,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
