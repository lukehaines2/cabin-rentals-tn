import type { CollectionConfig } from 'payload'

import { canViewLeads, canViewLeadsAdmin, isAdmin } from '../access/roles'

export const GuestEnquiries: CollectionConfig = {
  slug: 'guest-enquiries',
  access: {
    admin: canViewLeadsAdmin,
    create: () => false,
    read: canViewLeads,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    group: 'Leads',
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'property', 'status', 'createdAt'],
    description:
      'Public collection access stays disabled. The property page uses a controlled, server-validated action with honeypot screening and an explicit Local API override.',
  },
  fields: [
    {
      name: 'property',
      type: 'relationship',
      relationTo: 'properties',
      required: true,
      maxDepth: 0,
    },
    {
      name: 'propertySlugSnapshot',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'propertyNameSnapshot',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'preferredCheckIn',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'yyyy-MM-dd',
            },
          },
        },
        {
          name: 'preferredCheckOut',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'yyyy-MM-dd',
            },
          },
        },
      ],
    },
    {
      name: 'guests',
      type: 'number',
      required: true,
      min: 1,
      max: 30,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'sourceUrl',
      type: 'text',
      required: true,
    },
    {
      name: 'consent',
      type: 'group',
      fields: [
        {
          name: 'accepted',
          type: 'checkbox',
          required: true,
        },
        {
          name: 'wordingVersion',
          type: 'text',
          required: true,
        },
        {
          name: 'capturedAt',
          type: 'date',
          required: true,
        },
      ],
    },
    {
      name: 'abuseMetadata',
      type: 'group',
      fields: [
        {
          name: 'honeypotTriggered',
          type: 'checkbox',
          required: true,
          defaultValue: false,
        },
        {
          name: 'disposition',
          type: 'select',
          required: true,
          defaultValue: 'accepted',
          options: [
            { label: 'Accepted', value: 'accepted' },
            { label: 'Rejected as spam', value: 'rejected-spam' },
          ],
        },
        {
          name: 'requestFingerprint',
          type: 'text',
          admin: {
            description:
              'Optional irreversible abuse-control fingerprint; never store a raw IP here.',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      index: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
        { label: 'Spam', value: 'spam' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
    },
  ],
  timestamps: true,
}
