import { chromium } from '@playwright/test'
import { getPayload } from 'payload'

import config from '../src/payload.config'

const email = 'todo4-smoke@example.test'
const payload = await getPayload({ config })

const existing = await payload.find({
  collection: 'guest-enquiries',
  limit: 100,
  overrideAccess: true,
  where: { email: { equals: email } },
})

for (const enquiry of existing.docs) {
  await payload.delete({
    collection: 'guest-enquiries',
    id: enquiry.id,
    overrideAccess: true,
  })
}

const browser = await chromium.launch({ headless: true })

try {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
  })
  await page.goto('http://127.0.0.1:3010/')
  await page.waitForTimeout(1_000)
  await page.keyboard.press('Tab')
  if (
    (await page.evaluate(() => document.activeElement?.textContent?.trim())) !==
    'Skip to main content'
  ) {
    throw new Error('Skip link was not the first keyboard focus target.')
  }
  await page.locator('#home-location').focus()
  await page.keyboard.press('Tab')
  const focusedSearchControl = await page.evaluate(() => ({
    id: document.activeElement?.id,
    tagName: document.activeElement?.tagName,
  }))
  if (focusedSearchControl.id !== 'home-check-in') {
    throw new Error(
      `Homepage search keyboard order is incorrect: ${JSON.stringify(focusedSearchControl)}`,
    )
  }
  const searchButtonBox = await page
    .getByRole('button', { name: 'Search' })
    .boundingBox()
  if (!searchButtonBox || searchButtonBox.height < 44) {
    throw new Error('Homepage search touch target is too small.')
  }
  await page.selectOption('#home-location', 'gatlinburg')
  await page.fill('#home-check-in', '2026-10-12')
  await page.fill('#home-check-out', '2026-10-16')
  await page.fill('#home-guests', '6')
  await page.getByRole('button', { name: 'Search' }).click()
  await page.waitForURL(
    '**/cabins?location=gatlinburg&checkIn=2026-10-12&checkOut=2026-10-16&guests=6',
  )
  await page.getByText('2 cabins', { exact: true }).waitFor()
  if (
    !(await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ))
  ) {
    throw new Error('Catalogue overflows the 390px viewport.')
  }
  await page
    .getByRole('heading', { name: 'Laurel Glass Cabin' })
    .locator('..')
    .locator('..')
    .locator('..')
    .getByRole('link', { name: 'View Laurel Glass Cabin' })
    .click()
  await page.waitForURL(
    '**/cabins/laurel-glass-cabin?location=gatlinburg&checkIn=2026-10-12&checkOut=2026-10-16&guests=6',
  )
  if ((await page.locator('main img').count()) !== 5) {
    throw new Error('Laurel detail did not render hero plus four images.')
  }
  if (
    !(await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ))
  ) {
    throw new Error('Property detail overflows the 390px viewport.')
  }

  await page.fill('#laurel-glass-cabin-name', 'Todo 4 Smoke Guest')
  await page.fill('#laurel-glass-cabin-email', email)
  await page.fill('#laurel-glass-cabin-phone', '+1 865 555 0199')
  await page.fill(
    '#laurel-glass-cabin-message',
    'Temporary automated local journey verification.',
  )
  await page.check('#laurel-glass-cabin-consent')
  await page.getByRole('button', { name: 'Send enquiry' }).click()
  await page.waitForTimeout(2_000)
  const formFeedback = await page
    .locator('[aria-live="polite"]')
    .allTextContents()
  if (
    !(await page.getByText('Enquiry received', { exact: true }).isVisible())
  ) {
    throw new Error(`Enquiry UI did not succeed: ${formFeedback.join(' | ')}`)
  }

  const stored = await payload.find({
    collection: 'guest-enquiries',
    limit: 10,
    overrideAccess: true,
    where: { email: { equals: email } },
  })

  if (stored.totalDocs !== 1) {
    throw new Error(`Expected one smoke enquiry, received ${stored.totalDocs}.`)
  }

  const record = stored.docs[0]
  const verified = {
    propertySlugSnapshot: record.propertySlugSnapshot,
    propertyNameSnapshot: record.propertyNameSnapshot,
    preferredCheckIn: record.preferredCheckIn,
    preferredCheckOut: record.preferredCheckOut,
    guests: record.guests,
    name: record.name,
    email: record.email,
    phone: record.phone,
    message: record.message,
    sourceUrl: record.sourceUrl,
    consent: record.consent,
    status: record.status,
  }

  await payload.delete({
    collection: 'guest-enquiries',
    id: record.id,
    overrideAccess: true,
  })

  const afterCleanup = await payload.count({
    collection: 'guest-enquiries',
    overrideAccess: true,
    where: { email: { equals: email } },
  })

  if (
    record.preferredCheckIn !== '2026-10-12T12:00:00.000Z' ||
    record.preferredCheckOut !== '2026-10-16T12:00:00.000Z' ||
    record.guests !== 6 ||
    record.propertySlugSnapshot !== 'laurel-glass-cabin' ||
    afterCleanup.totalDocs !== 0
  ) {
    throw new Error('Stored enquiry fields or cleanup did not match.')
  }

  console.info('Todo 4 journey smoke complete', {
    storedCount: stored.totalDocs,
    verified,
    remainingSmokeRecords: afterCleanup.totalDocs,
  })
} finally {
  await browser.close()
  await payload.destroy()
}

process.exit(0)
