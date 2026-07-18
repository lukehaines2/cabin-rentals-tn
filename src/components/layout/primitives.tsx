import type { ComponentProps, ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T
  className?: string
} & Omit<ComponentProps<T>, 'as' | 'className'>

function Container<T extends ElementType = 'div'>({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component
      className={cn(
        'mx-auto w-full max-w-[84rem] px-[var(--page-gutter)]',
        className,
      )}
      {...props}
    />
  )
}

type SectionProps = ComponentProps<'section'> & {
  tone?: 'default' | 'muted' | 'pine'
}

function Section({ className, tone = 'default', ...props }: SectionProps) {
  return (
    <section
      data-tone={tone}
      className={cn(
        'py-[var(--section-space)]',
        tone === 'muted' && 'bg-secondary/55',
        tone === 'pine' && 'bg-primary text-primary-foreground',
        className,
      )}
      {...props}
    />
  )
}

type SectionHeadingProps = {
  align?: 'start' | 'center'
  className?: string
  description?: ReactNode
  eyebrow?: string
  id?: string
  title: ReactNode
}

function SectionHeading({
  align = 'start',
  className,
  description,
  eyebrow,
  id,
  title,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex max-w-3xl flex-col gap-4',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-ember text-xs font-bold tracking-[0.18em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="font-heading text-[length:var(--text-section)] leading-[0.98] font-medium tracking-[-0.035em] text-balance"
      >
        {title}
      </h2>
      {description ? (
        <div className="text-muted-foreground max-w-2xl text-base leading-7 text-pretty sm:text-lg sm:leading-8">
          {description}
        </div>
      ) : null}
    </div>
  )
}

export { Container, Section, SectionHeading }
