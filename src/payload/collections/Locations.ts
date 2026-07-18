import { slugField, type CollectionConfig } from 'payload'

import { isAdmin, isContentStaff, publicOrContentStaff } from '../access/roles'

export const Locations: CollectionConfig = {
  slug: 'locations',
  access: {
    create: isContentStaff,
    read: publicOrContentStaff({ active: { equals: true } }),
    update: isContentStaff,
    delete: isAdmin,
  },
  admin: {
    group: 'Property catalogue',
    useAsTitle: 'name',
    defaultColumns: ['name', 'kind', 'town', 'active'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField({ useAsSlug: 'name' }),
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Town', value: 'town' },
        { label: 'Area', value: 'area' },
      ],
    },
    {
      name: 'town',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'Gatlinburg', value: 'gatlinburg' },
        { label: 'Pigeon Forge', value: 'pigeon-forge' },
        { label: 'Sevierville', value: 'sevierville' },
      ],
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'locations',
      maxDepth: 1,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
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
