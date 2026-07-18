import { Container } from '@/components/layout/primitives'

function DemoBanner() {
  return (
    <aside
      aria-label="Demo website notice"
      className="bg-ember text-ember-foreground"
    >
      <Container className="flex min-h-9 items-center justify-center py-2 text-center text-[0.7rem] leading-4 font-bold tracking-[0.14em] uppercase sm:text-xs">
        Fictional non-indexed demo · No live availability, rates, or
        reservations
      </Container>
    </aside>
  )
}

export { DemoBanner }
