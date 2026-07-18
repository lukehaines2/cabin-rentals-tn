import { Container } from '@/components/layout/primitives'
import { NotFoundState } from '@/components/states/public-states'

export default function SiteNotFound() {
  return (
    <main id="main-content">
      <Container className="py-12">
        <NotFoundState />
      </Container>
    </main>
  )
}
