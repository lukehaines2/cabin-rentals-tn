import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

async function revalidatePropertyPaths(slug?: string | null) {
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/')
    revalidatePath('/cabins')
    if (slug) revalidatePath(`/cabins/${slug}`)
  } catch {
    // Payload CLI operations do not have a Next.js cache store.
  }
}

export const revalidateProperty: CollectionAfterChangeHook = async ({
  context,
  doc,
  previousDoc,
}) => {
  if (context.skipRevalidation) return doc

  const wasPublic =
    previousDoc?._status === 'published' &&
    previousDoc?.listingStatus === 'active'
  const isPublic = doc._status === 'published' && doc.listingStatus === 'active'

  if (wasPublic || isPublic) {
    await revalidatePropertyPaths(doc.slug)
  }

  return doc
}

export const revalidateDeletedProperty: CollectionAfterDeleteHook = async ({
  context,
  doc,
}) => {
  if (!context.skipRevalidation) {
    await revalidatePropertyPaths(doc.slug)
  }

  return doc
}
