import type {
  Access,
  CollectionConfig,
  FieldAccess,
  GlobalConfig,
  Where,
} from 'payload'

type StaffRole = 'admin' | 'editor' | 'lead-viewer'

type StaffUser = {
  id: number | string
  roles?: StaffRole[] | null
  status?: 'active' | 'disabled' | null
}

function getStaffUser(user: unknown): StaffUser | null {
  if (!user || typeof user !== 'object') return null
  return user as StaffUser
}

function hasRole(user: unknown, roles: StaffRole[]) {
  const staffUser = getStaffUser(user)
  return Boolean(
    staffUser?.status === 'active' &&
    staffUser.roles?.some((role) => roles.includes(role)),
  )
}

export const isAdmin: Access = ({ req }) => hasRole(req.user, ['admin'])

export const isAdminField: FieldAccess = ({ req }) =>
  hasRole(req.user, ['admin'])

export const isContentStaff: Access = ({ req }) =>
  hasRole(req.user, ['admin', 'editor'])

export const isContentStaffField: FieldAccess = ({ req }) =>
  hasRole(req.user, ['admin', 'editor'])

export const canViewLeads: Access = ({ req }) =>
  hasRole(req.user, ['admin', 'lead-viewer'])

export const canViewLeadsAdmin: NonNullable<
  CollectionConfig['access']
>['admin'] = ({ req }) => hasRole(req.user, ['admin', 'lead-viewer'])

export const publicOrContentStaff =
  (publicConstraint: Where): Access =>
  ({ req }) =>
    hasRole(req.user, ['admin', 'editor']) ? true : publicConstraint

export const adminGlobalUpdate: NonNullable<
  GlobalConfig['access']
>['update'] = ({ req }) => hasRole(req.user, ['admin'])

export function isAdminUser(user: unknown) {
  return hasRole(user, ['admin'])
}
