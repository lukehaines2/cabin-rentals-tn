import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminField, isAdminUser } from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req }) => Boolean(req.user),
    create: async ({ req }) => {
      if (isAdminUser(req.user)) return true

      const existingUsers = await req.payload.count({
        collection: 'users',
        overrideAccess: true,
      })
      return existingUsers.totalDocs === 0
    },
    read: ({ req }) => {
      if (isAdminUser(req.user)) return true
      return req.user ? { id: { equals: req.user.id } } : false
    },
    update: ({ req }) => {
      if (isAdminUser(req.user)) return true
      return req.user ? { id: { equals: req.user.id } } : false
    },
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'email',
    group: 'Staff',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 2 * 60 * 60,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ({ user }) => (user ? ['editor'] : ['admin']),
      saveToJWT: true,
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Lead viewer', value: 'lead-viewer' },
      ],
      access: {
        create: isAdminField,
        update: isAdminField,
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      saveToJWT: true,
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Disabled', value: 'disabled' },
      ],
      access: {
        create: isAdminField,
        update: isAdminField,
      },
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
