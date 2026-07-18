import { expect, test, type Locator, type Page } from '@playwright/test'

import { fixtureProperties } from '../../src/fixtures/properties'
import {
  closeTestPayload,
  deleteEnquiriesByEmail,
  findEnquiriesByEmail,
} from './payload-test-utils'

const checkIn = '2027-10-12'
const checkOut = '2027-10-15'
const enquiryEmail = 'stage1-e2e@example.test'
const searchQuery = `location=gatlinburg&checkIn=${checkIn}&checkOut=${checkOut}&guests=4`

async function tabUntilFocused(page: Page, target: Locator, attempts = 4) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    await page.keyboard.press('Tab')
    if (
      await target.evaluate((element) => document.activeElement === element)
    ) {
      return
    }
  }

  await expect(target).toBeFocused()
}

test.describe.configure({ mode: 'serial' })

test.beforeAll(async () => {
  await deleteEnquiriesByEmail(enquiryEmail)
})

test.afterAll(async () => {
  await deleteEnquiriesByEmail(enquiryEmail)
  await closeTestPayload()
})

test('homepage search reaches a preserved property enquiry and stores it', async ({
  page,
}) => {
  await page.goto('/')

  const search = page.getByRole('form', { name: 'Search cabins' })
  await search.getByLabel('Location').selectOption('gatlinburg')
  await search.getByLabel('Preferred check-in').fill(checkIn)
  await search.getByLabel('Preferred check-out').fill(checkOut)
  await search.getByLabel('Guests').fill('4')
  await search.getByRole('button', { name: 'Search' }).click()

  await expect(page).toHaveURL(`/cabins?${searchQuery}`)
  await expect(page.getByText('3 cabins', { exact: true })).toBeVisible()

  await page.reload()
  const restoredSearch = page.getByRole('form', { name: 'Search cabins' })
  await expect(restoredSearch.getByLabel('Location')).toHaveValue('gatlinburg')
  await expect(restoredSearch.getByLabel('Preferred check-in')).toHaveValue(
    checkIn,
  )
  await expect(restoredSearch.getByLabel('Preferred check-out')).toHaveValue(
    checkOut,
  )
  await expect(restoredSearch.getByLabel('Guests')).toHaveValue('4')

  const laurelHeading = page.getByRole('heading', {
    name: 'Laurel Glass Cabin',
  })
  const laurelCard = laurelHeading
    .locator('xpath=ancestor::*[@data-slot="card"][1]')
  await expect(
    laurelCard.getByRole('link', { name: 'View Laurel Glass Cabin' }),
  ).toBeVisible()
  await laurelHeading.click()

  await expect(page).toHaveURL(`/cabins/laurel-glass-cabin?${searchQuery}`)
  await expect(page.getByText('Oct 12, 2027 – Oct 15, 2027')).toBeVisible()
  await expect(
    page.getByText('4 guests · No live availability shown'),
  ).toBeVisible()

  await page.getByLabel('Name').fill('Stage One Guest')
  await page.getByLabel('Email').fill(enquiryEmail)
  await page
    .getByLabel('Message')
    .fill('Deterministic Stage 1 Playwright verification enquiry.')
  await page.getByLabel(/I consent to my details/).check()
  await page.getByRole('button', { name: 'Send enquiry' }).click()

  await expect(
    page.getByText('Enquiry received', { exact: true }),
  ).toBeVisible()
  await expect(
    page.getByText(/Availability still needs to be checked/),
  ).toBeVisible()

  const stored = await findEnquiriesByEmail(enquiryEmail)
  expect(stored.totalDocs).toBe(1)
  expect(stored.docs[0]).toMatchObject({
    propertySlugSnapshot: 'laurel-glass-cabin',
    propertyNameSnapshot: 'Laurel Glass Cabin',
    guests: 4,
    name: 'Stage One Guest',
    email: enquiryEmail,
    message: 'Deterministic Stage 1 Playwright verification enquiry.',
    status: 'new',
  })
  expect(stored.docs[0]?.preferredCheckIn).toContain(checkIn)
  expect(stored.docs[0]?.preferredCheckOut).toContain(checkOut)
  expect(stored.docs[0]?.sourceUrl).toBe(
    `http://127.0.0.1:3100/cabins/laurel-glass-cabin?${searchQuery}`,
  )
  expect(stored.docs[0]?.consent).toMatchObject({
    accepted: true,
    wordingVersion: 'guest-enquiry-v1',
  })

  expect(await deleteEnquiriesByEmail(enquiryEmail)).toBe(1)
  await expect
    .poll(async () => (await findEnquiriesByEmail(enquiryEmail)).totalDocs)
    .toBe(0)
})

test('empty and invalid search states fail safely and can be reset', async ({
  page,
}) => {
  await page.goto(
    `/cabins?location=gatlinburg&checkIn=${checkIn}&checkOut=${checkOut}&guests=30`,
  )
  await expect(page.getByText('0 cabins', { exact: true })).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'No cabins match those choices' }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Reset everything' }).click()
  await expect(page).toHaveURL('/cabins')
  await expect(page.getByText('10 cabins', { exact: true })).toBeVisible()

  await page.goto(
    '/cabins?location=unknown&checkIn=bad&checkOut=2027-01-01&guests=999&unexpected=value',
  )
  await expect(page.getByText('10 cabins', { exact: true })).toBeVisible()
  const search = page.getByRole('form', { name: 'Search cabins' })
  await expect(search.getByLabel('Location')).toHaveValue('')
  await expect(search.getByLabel('Preferred check-in')).toHaveValue('')
  await expect(search.getByLabel('Preferred check-out')).toHaveValue('')
  await expect(search.getByLabel('Guests')).toHaveValue('')
  await expect(page.getByRole('button', { name: 'Reset all' })).toBeVisible()
})

test('unknown and unpublished property paths return not found', async ({
  page,
}) => {
  for (const slug of ['not-a-real-property', 'unpublished-demo-property']) {
    const response = await page.goto(`/cabins/${slug}`)
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible()
  }
})

test('property gallery and hero-only fallback are explicit', async ({
  page,
}) => {
  await page.goto('/cabins/laurel-glass-cabin')
  await expect(
    page.getByLabel('Laurel Glass Cabin image gallery').getByRole('img'),
  ).toHaveCount(5)

  await page.goto('/cabins/hemlock-house')
  await expect(
    page.getByRole('heading', { name: 'Hero-only demo gallery' }),
  ).toBeVisible()
  await expect(page.getByText(/falls back intentionally/)).toBeVisible()
})

test('demo indexing safeguards remain active', async ({ page, request }) => {
  await page.goto('/')
  const robotsMeta = page.locator('meta[name="robots"]')
  await expect(robotsMeta).toHaveAttribute('content', /noindex/i)
  await expect(robotsMeta).toHaveAttribute('content', /nofollow/i)

  const robots = await request.get('/robots.txt')
  expect(robots.status()).toBe(200)
  expect(await robots.text()).toContain('Disallow: /')

  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.status()).toBe(200)
  const sitemapBody = await sitemap.text()
  expect(sitemapBody).toContain('<urlset')
  expect(sitemapBody).not.toContain('<url>')
})

test('initial HTML remains useful when JavaScript is disabled', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()

  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: 'Stay close to what feels wild.' }),
  ).toBeVisible()
  await expect(page.getByRole('form', { name: 'Search cabins' })).toBeVisible()

  await page.goto('/cabins')
  await expect(
    page.getByRole('heading', {
      name: 'Find a cabin shaped around your group.',
    }),
  ).toBeVisible()
  for (const property of fixtureProperties) {
    await expect(
      page.getByRole('heading', { name: property.name }),
    ).toBeVisible()
  }

  await page.goto('/cabins/laurel-glass-cabin')
  await expect(
    page.getByRole('heading', { name: 'Laurel Glass Cabin' }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Property facts' }),
  ).toBeVisible()
  await expect(page.getByText('Availability unverified')).toBeVisible()

  await context.close()
})

test('keyboard order, mobile sheet focus, and validation announcement work', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  await page.keyboard.press('Tab')
  const skipLink = page.getByRole('link', { name: 'Skip to main content' })
  await expect(skipLink).toBeFocused()
  await expect(skipLink).toBeVisible()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main-content$/)

  const mobileTrigger = page.getByRole('button', { name: 'Open site menu' })
  await mobileTrigger.click()
  await expect(
    page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: 'Home' }),
  ).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(mobileTrigger).toBeFocused()

  const search = page.getByRole('form', { name: 'Search cabins' })
  const location = search.getByLabel('Location')
  await location.focus()
  const visibleFocus = await location.evaluate((element) => {
    const style = getComputedStyle(element)
    return style.outlineStyle !== 'none' || style.boxShadow !== 'none'
  })
  expect(visibleFocus).toBe(true)
  await tabUntilFocused(page, search.getByLabel('Preferred check-in'))
  await tabUntilFocused(page, search.getByLabel('Preferred check-out'))
  await tabUntilFocused(page, search.getByLabel('Guests'))
  await tabUntilFocused(page, search.getByRole('button', { name: 'Search' }))

  await page.goto(`/cabins/laurel-glass-cabin?${searchQuery}`)
  const enquiryForm = page.locator('form').filter({
    has: page.getByRole('button', { name: 'Send enquiry' }),
  })
  await enquiryForm.getByRole('button', { name: 'Send enquiry' }).click()
  await expect(
    page.getByText('Check your details', { exact: true }),
  ).toBeVisible()
  await expect(
    page.getByText('Please review the highlighted fields and try again.'),
  ).toBeVisible()
  const announcement = enquiryForm.locator(':scope > div[aria-live="polite"]')
  await expect(announcement).toBeFocused()
  await expect(
    enquiryForm.getByText('Consent is required to send this enquiry.'),
  ).toBeVisible()
})

test('primary pages remain usable without horizontal overflow at target widths', async ({
  page,
}) => {
  const routes = [
    {
      path: '/',
      heading: 'Stay close to what feels wild.',
      content: 'Dates are preferences only',
    },
    {
      path: '/cabins',
      heading: 'Find a cabin shaped around your group.',
      content: '10 cabins',
    },
    {
      path: '/cabins/laurel-glass-cabin',
      heading: 'Laurel Glass Cabin',
      content: 'Property facts',
    },
  ]

  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    for (const route of routes) {
      await page.goto(route.path)
      await expect(
        page.getByRole('heading', { level: 1, name: route.heading }),
      ).toBeVisible()
      await expect(
        page.getByText(route.content, { exact: false }).first(),
      ).toBeVisible()
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true)
    }
  }
})
