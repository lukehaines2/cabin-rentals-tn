'use client'

import { CheckCircle2Icon, SendIcon, TriangleAlertIcon } from 'lucide-react'
import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'

import { submitGuestEnquiry } from '@/app/(site)/cabins/[slug]/actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  initialGuestEnquiryState,
  type GuestEnquiryActionState,
} from '@/domain/guest-enquiry-form'

function fieldError(
  state: GuestEnquiryActionState,
  name: string,
): string | undefined {
  return state.fieldErrors?.[name]?.[0]
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full">
      <SendIcon data-icon="inline-start" />
      {pending ? 'Sending enquiry…' : 'Send enquiry'}
    </Button>
  )
}

type GuestEnquiryFormProps = {
  propertyIdentity: string
  propertyName: string
  propertySlug: string
  preferredCheckIn?: string
  preferredCheckOut?: string
  guests: number
  sourceUrl: string
}

export function GuestEnquiryForm({
  propertyIdentity,
  propertyName,
  propertySlug,
  preferredCheckIn,
  preferredCheckOut,
  guests,
  sourceUrl,
}: GuestEnquiryFormProps) {
  const [state, formAction] = useActionState(
    submitGuestEnquiry,
    initialGuestEnquiryState,
  )
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state.status !== 'idle') {
      statusRef.current?.focus()
    }
  }, [state.status])

  if (state.status === 'success') {
    return (
      <Alert
        ref={statusRef}
        tabIndex={-1}
        aria-live="polite"
        className="bg-card"
      >
        <CheckCircle2Icon />
        <AlertTitle>Enquiry received</AlertTitle>
        <AlertDescription>{state.message}</AlertDescription>
      </Alert>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <input type="hidden" name="propertySlug" value={propertySlug} />
      <input type="hidden" name="propertyIdentity" value={propertyIdentity} />
      <input type="hidden" name="sourceUrl" value={sourceUrl} />
      <input type="hidden" name="consentVersion" value="guest-enquiry-v1" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-auto -left-[10000px] size-px overflow-hidden"
      >
        <label htmlFor={`${propertySlug}-website`}>Website</label>
        <input
          id={`${propertySlug}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" aria-atomic="true">
        {state.status === 'validation-error' ||
        state.status === 'server-error' ? (
          <Alert variant="destructive">
            <TriangleAlertIcon />
            <AlertTitle>
              {state.status === 'validation-error'
                ? 'Check your details'
                : 'Enquiry not sent'}
            </AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        ) : null}
      </div>

      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={Boolean(fieldError(state, 'preferredCheckIn'))}>
            <FieldLabel htmlFor={`${propertySlug}-check-in`}>
              Preferred check-in
            </FieldLabel>
            <Input
              id={`${propertySlug}-check-in`}
              name="preferredCheckIn"
              type="date"
              defaultValue={preferredCheckIn}
              aria-invalid={Boolean(fieldError(state, 'preferredCheckIn'))}
              aria-describedby={`${propertySlug}-check-in-error`}
            />
            <FieldError id={`${propertySlug}-check-in-error`}>
              {fieldError(state, 'preferredCheckIn')}
            </FieldError>
          </Field>
          <Field data-invalid={Boolean(fieldError(state, 'preferredCheckOut'))}>
            <FieldLabel htmlFor={`${propertySlug}-check-out`}>
              Preferred check-out
            </FieldLabel>
            <Input
              id={`${propertySlug}-check-out`}
              name="preferredCheckOut"
              type="date"
              min={preferredCheckIn}
              defaultValue={preferredCheckOut}
              aria-invalid={Boolean(fieldError(state, 'preferredCheckOut'))}
              aria-describedby={`${propertySlug}-check-out-error`}
            />
            <FieldError id={`${propertySlug}-check-out-error`}>
              {fieldError(state, 'preferredCheckOut')}
            </FieldError>
          </Field>
        </div>

        <Field data-invalid={Boolean(fieldError(state, 'guests'))}>
          <FieldLabel htmlFor={`${propertySlug}-guests`}>Guests</FieldLabel>
          <Input
            id={`${propertySlug}-guests`}
            name="guests"
            type="number"
            inputMode="numeric"
            min={1}
            max={30}
            defaultValue={guests}
            required
            aria-invalid={Boolean(fieldError(state, 'guests'))}
            aria-describedby={`${propertySlug}-guests-error`}
          />
          <FieldError id={`${propertySlug}-guests-error`}>
            {fieldError(state, 'guests')}
          </FieldError>
        </Field>

        <Field data-invalid={Boolean(fieldError(state, 'name'))}>
          <FieldLabel htmlFor={`${propertySlug}-name`}>Name</FieldLabel>
          <Input
            id={`${propertySlug}-name`}
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            aria-invalid={Boolean(fieldError(state, 'name'))}
            aria-describedby={`${propertySlug}-name-error`}
          />
          <FieldError id={`${propertySlug}-name-error`}>
            {fieldError(state, 'name')}
          </FieldError>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={Boolean(fieldError(state, 'email'))}>
            <FieldLabel htmlFor={`${propertySlug}-email`}>Email</FieldLabel>
            <Input
              id={`${propertySlug}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              aria-invalid={Boolean(fieldError(state, 'email'))}
              aria-describedby={`${propertySlug}-email-error`}
            />
            <FieldError id={`${propertySlug}-email-error`}>
              {fieldError(state, 'email')}
            </FieldError>
          </Field>
          <Field data-invalid={Boolean(fieldError(state, 'phone'))}>
            <FieldLabel htmlFor={`${propertySlug}-phone`}>
              Phone <span className="text-muted-foreground">(optional)</span>
            </FieldLabel>
            <Input
              id={`${propertySlug}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
              aria-invalid={Boolean(fieldError(state, 'phone'))}
              aria-describedby={`${propertySlug}-phone-error`}
            />
            <FieldError id={`${propertySlug}-phone-error`}>
              {fieldError(state, 'phone')}
            </FieldError>
          </Field>
        </div>

        <Field data-invalid={Boolean(fieldError(state, 'message'))}>
          <FieldLabel htmlFor={`${propertySlug}-message`}>
            Message <span className="text-muted-foreground">(optional)</span>
          </FieldLabel>
          <Textarea
            id={`${propertySlug}-message`}
            name="message"
            maxLength={2000}
            rows={5}
            placeholder={`What would you like us to know about your enquiry for ${propertyName}?`}
            aria-invalid={Boolean(fieldError(state, 'message'))}
            aria-describedby={`${propertySlug}-message-error`}
          />
          <FieldError id={`${propertySlug}-message-error`}>
            {fieldError(state, 'message')}
          </FieldError>
        </Field>

        <Field
          orientation="horizontal"
          data-invalid={Boolean(fieldError(state, 'consent'))}
        >
          <input
            id={`${propertySlug}-consent`}
            name="consent"
            type="checkbox"
            required
            className="mt-1 size-5 shrink-0"
            aria-invalid={Boolean(fieldError(state, 'consent'))}
            aria-describedby={`${propertySlug}-consent-description ${propertySlug}-consent-error`}
          />
          <div className="flex flex-col gap-1">
            <FieldLabel htmlFor={`${propertySlug}-consent`}>
              I consent to my details being used to respond to this stay
              enquiry.
            </FieldLabel>
            <FieldDescription id={`${propertySlug}-consent-description`}>
              This sends an enquiry, not a reservation. Availability must be
              confirmed separately.
            </FieldDescription>
            <FieldError id={`${propertySlug}-consent-error`}>
              {fieldError(state, 'consent')}
            </FieldError>
          </div>
        </Field>
      </FieldGroup>

      <SubmitButton />
    </form>
  )
}
