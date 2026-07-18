import Link from 'next/link'
import { CircleAlertIcon, CompassIcon, MountainSnowIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { Container } from '@/components/layout/primitives'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { buttonVariants } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Skeleton } from '@/components/ui/skeleton'

type EmptyStateProps = {
  action?: ReactNode
  description?: string
  title?: string
}

function LoadingState({ label = 'Loading page' }: { label?: string }) {
  return (
    <Container
      role="status"
      aria-label={label}
      aria-live="polite"
      className="grid min-h-[55vh] content-center gap-8 py-16"
    >
      <span className="sr-only">{label}</span>
      <div className="flex max-w-2xl flex-col gap-4">
        <Skeleton className="h-3 w-32 rounded-full" />
        <Skeleton className="h-14 w-full max-w-xl rounded-xl" />
        <Skeleton className="h-5 w-full max-w-lg" />
        <Skeleton className="h-5 w-3/4 max-w-md" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className="aspect-[4/3] min-h-40 w-full rounded-2xl"
          />
        ))}
      </div>
    </Container>
  )
}

function EmptyState({
  action,
  description = 'Try adjusting your choices or return to the full cabin collection.',
  title = 'No cabins match those choices',
}: EmptyStateProps) {
  return (
    <Empty className="border-border bg-card/70 min-h-80 border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MountainSnowIcon />
        </EmptyMedia>
        <EmptyTitle>
          <h2 className="font-heading text-2xl">{title}</h2>
        </EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {action ? <EmptyContent>{action}</EmptyContent> : null}
    </Empty>
  )
}

type ErrorStateProps = {
  action?: ReactNode
  description?: string
  title?: string
}

function ErrorState({
  action,
  description = 'The page could not be loaded just now. Please try again, or return home.',
  title = 'The trail went quiet',
}: ErrorStateProps) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5">
      <Alert variant="destructive" className="bg-card px-5 py-5">
        <CircleAlertIcon />
        <AlertTitle>
          <h1 className="font-heading text-foreground text-3xl">{title}</h1>
        </AlertTitle>
        <AlertDescription className="mt-2 leading-6">
          {description}
        </AlertDescription>
      </Alert>
      {action ? (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {action}
        </div>
      ) : null}
    </div>
  )
}

function NotFoundState() {
  return (
    <Empty className="min-h-[55vh]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CompassIcon />
        </EmptyMedia>
        <EmptyTitle>
          <h1 className="font-heading text-4xl sm:text-5xl">
            This path ends here
          </h1>
        </EmptyTitle>
        <EmptyDescription className="max-w-md">
          We could not find the page you were looking for. Return to the cabin
          collection to continue exploring.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row flex-wrap justify-center">
        <Link href="/" className={buttonVariants({ size: 'lg' })}>
          Return home
        </Link>
        <Link
          href="/cabins"
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
        >
          Explore cabins
        </Link>
      </EmptyContent>
    </Empty>
  )
}

export { EmptyState, ErrorState, LoadingState, NotFoundState }
