import { slugField, type CollectionConfig } from 'payload'

import { isAdmin, isContentStaff, publicOrContentStaff } from '../access/roles'

export const Amenities: CollectionConfig = {
  slug: 'amenities',
  access: {
    create: isContentStaff,
    read: publicOrContentStaff({ active: { equals: true } }),
    update: isContentStaff,
    delete: isAdmin,
  },
  admin: {
    group: 'Property catalogue',
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'filterable', 'active'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField({ useAsSlug: 'name' }),
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Wellness', value: 'wellness' },
        { label: 'View', value: 'view' },
        { label: 'Leisure', value: 'leisure' },
        { label: 'Guest policy', value: 'guest-policy' },
        { label: 'Interior', value: 'interior' },
      ],
    },
    {
      name: 'filterable',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'featured',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'displayOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
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
