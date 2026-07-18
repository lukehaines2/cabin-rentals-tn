'use client'

import Link from 'next/link'

import { Container } from '@/components/layout/primitives'
import { ErrorState } from '@/components/states/public-states'
import { Button, buttonVariants } from '@/components/ui/button'

export default function SiteError({ reset }: { reset: () => void }) {
  return (
    <main id="main-content">
      <Container className="grid min-h-[55vh] place-items-center py-16">
        <ErrorState
          action={
            <>
              <Button type="button" size="lg" onClick={reset}>
                Try again
              </Button>
              <Link
                href="/"
                className={buttonVariants({ variant: 'outline', size: 'lg' })}
              >
                Return home
              </Link>
            </>
          }
        />
      </Container>
    </main>
  )
}
