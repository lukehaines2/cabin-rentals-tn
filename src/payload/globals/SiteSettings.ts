import type { GlobalConfig } from 'payload'

import { adminGlobalUpdate } from '../access/roles'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: adminGlobalUpdate,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      required: true,
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'demoNotice',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          required: true,
          defaultValue: true,
        },
        {
          name: 'message',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'defaultSeo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          maxLength: 70,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          maxLength: 170,
        },
        {
          name: 'socialImage',
          type: 'upload',
          relationTo: 'media',
          maxDepth: 1,
          filterOptions: {
            approvalStatus: { equals: 'approved' },
          },
        },
      ],
    },
  ],
}
