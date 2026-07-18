import path from 'node:path'

import type { CollectionConfig } from 'payload'

import {
  isAdmin,
  isContentStaff,
  isContentStaffField,
  publicOrContentStaff,
} from '../access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: isContentStaff,
    read: publicOrContentStaff({
      approvalStatus: { equals: 'approved' },
    }),
    update: isContentStaff,
    delete: isAdmin,
  },
  admin: {
    group: 'Content',
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'approvalStatus', 'isDemo'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'sourceMethod',
      type: 'select',
      required: true,
      options: [
        { label: 'AI generated', value: 'ai-generated' },
        { label: 'Business supplied', value: 'business-supplied' },
        { label: 'Licensed', value: 'licensed' },
      ],
      access: {
        read: isContentStaffField,
      },
    },
    {
      name: 'licenseRecord',
      type: 'textarea',
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
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
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
      name: 'requiredReplacement',
      type: 'checkbox',
      required: true,
      defaultValue: true,
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
  upload: {
    staticDir: path.resolve(process.cwd(), 'media'),
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    filesRequiredOnCreate: true,
    focalPoint: true,
    crop: true,
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 480,
        height: 270,
        position: 'centre',
      },
      {
        name: 'card',
        width: 960,
        height: 540,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1600,
        height: 900,
        position: 'centre',
      },
    ],
  },
  timestamps: true,
}
