import { slugField, type CollectionConfig } from 'payload'

import { isAdmin, isContentStaff, publicOrContentStaff } from '../access/roles'

export const PropertyTypes: CollectionConfig = {
  slug: 'property-types',
  access: {
    create: isContentStaff,
    read: publicOrContentStaff({ active: { equals: true } }),
    update: isContentStaff,
    delete: isAdmin,
  },
  admin: {
    group: 'Property catalogue',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'active'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField({ useAsSlug: 'name' }),
    {
      name: 'active',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isDemo',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
