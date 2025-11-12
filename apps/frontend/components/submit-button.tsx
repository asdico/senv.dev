'use client'

import { useFormStatus } from 'react-dom'

import { Button } from '@repo/ui/src/components/button'
import { Spinner } from '@repo/ui/src/components/spinner'

export function SubmitButton({
  text,
}: {
  text: string
}) {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} type="submit">
      {pending && <Spinner />}
      {text}
    </Button>
  )
}
