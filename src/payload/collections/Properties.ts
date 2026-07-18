import {
  slugField,
  type CollectionBeforeValidateHook,
  type CollectionConfig,
} from 'payload'

import {
  isAdmin,
  isContentStaff,
  isContentStaffField,
  publicOrContentStaff,
} from '../access/roles'
import {
  revalidateDeletedProperty,
  revalidateProperty,
} from '../hooks/revalidate-properties'

const validateConversionAction: CollectionBeforeValidateHook = ({ data }) => {
  const action = data?.conversionAction as
    { mode?: string; url?: string | null } | undefined

  if (
    action &&
    action.mode !== 'enquiry' &&
    (!action.url || !URL.canParse(action.url))
  ) {
    throw new Error(
      'External and hosted-engine conversion actions require a valid URL.',
    )
  }

  return data
}

export const Properties: CollectionConfig = {
  slug: 'properties',
  access: {
    create: isContentStaff,
    read: publicOrContentStaff({
      and: [
        { _status: { equals: 'published' } },
        { listingStatus: { equals: 'active' } },
      ],
    }),
    update: isContentStaff,
    delete: isAdmin,
    readVersions: isContentStaff,
  },
  admin: {
    group: 'Property catalogue',
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'listingStatus', '_status', 'isDemo'],
    listSearchableFields: ['name', 'slug', 'internalId'],
  },
  versions: {
    drafts: true,
    maxPerDoc: 30,
  },
  hooks: {
    beforeValidate: [validateConversionAction],
    afterChange: [revalidateProperty],
    afterDelete: [revalidateDeletedProperty],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField({ useAsSlug: 'name' }),
    {
      name: 'internalId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'listingStatus',
      type: 'select',
      required: true,
      defaultValue: 'onboarding',
      index: true,
      options: [
        { label: 'Onboarding', value: 'onboarding' },
        { label: 'Active', value: 'active' },
        { label: 'Hidden', value: 'hidden' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        description:
          'Business lifecycle status. Public visibility also requires Payload publication.',
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
      index: true,
      maxDepth: 1,
      filterOptions: {
        active: { equals: true },
      },
    },
    {
      name: 'propertyType',
      type: 'relationship',
      relationTo: 'property-types',
      required: true,
      index: true,
      maxDepth: 1,
      filterOptions: {
        active: { equals: true },
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'maxGuests',
          type: 'number',
          required: true,
          min: 1,
          max: 30,
          index: true,
        },
        {
          name: 'bedrooms',
          type: 'number',
          required: true,
          min: 1,
          max: 15,
          index: true,
        },
        {
          name: 'bathrooms',
          type: 'number',
          required: true,
          min: 0.5,
          max: 15,
        },
      ],
    },
    {
      name: 'amenities',
      type: 'relationship',
      relationTo: 'amenities',
      hasMany: true,
      required: true,
      index: true,
      maxDepth: 1,
      filterOptions: {
        active: { equals: true },
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      maxDepth: 1,
      filterOptions: {
        approvalStatus: { equals: 'approved' },
      },
    },
    {
      name: 'gallery',
      type: 'array',
      maxRows: 12,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          maxDepth: 1,
          filterOptions: {
            approvalStatus: { equals: 'approved' },
          },
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 320,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'conversionAction',
      type: 'group',
      fields: [
        {
          name: 'mode',
          type: 'select',
          required: true,
          defaultValue: 'enquiry',
          options: [
            { label: 'Enquiry', value: 'enquiry' },
            { label: 'External handoff', value: 'external' },
            { label: 'Hosted engine', value: 'hosted-engine' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Request preferred dates',
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData.mode !== 'enquiry',
          },
        },
      ],
    },
    {
      name: 'contentOwner',
      type: 'text',
      required: true,
      access: {
        read: isContentStaffField,
      },
    },
    {
      name: 'approvalStatus',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved for demo', value: 'approved-demo' },
        { label: 'Approved for public use', value: 'approved-public' },
      ],
      access: {
        read: isContentStaffField,
      },
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
