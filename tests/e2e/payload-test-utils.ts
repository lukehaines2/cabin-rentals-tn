import { getPayload, type Payload } from 'payload'

import config from '../../src/payload.config'

let payloadPromise: Promise<Payload> | undefined

function testPayload() {
  payloadPromise ??= getPayload({ config })
  return payloadPromise
}

export async function findEnquiriesByEmail(email: string) {
  const payload = await testPayload()
  return payload.find({
    collection: 'guest-enquiries',
    depth: 0,
    limit: 20,
    overrideAccess: true,
    where: { email: { equals: email } },
  })
}

export async function deleteEnquiriesByEmail(email: string) {
  const payload = await testPayload()
  const enquiries = await findEnquiriesByEmail(email)

  for (const enquiry of enquiries.docs) {
    await payload.delete({
      collection: 'guest-enquiries',
      id: enquiry.id,
      overrideAccess: true,
    })
  }

  return enquiries.totalDocs
}

export async function closeTestPayload() {
  if (!payloadPromise) return

  const payload = await payloadPromise
  await payload.destroy()
  payloadPromise = undefined
}
