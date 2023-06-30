import { NextResponse } from 'next/server'
import { serviceGetEvent } from '~/services/events'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  if (params.id) {
    const event = await serviceGetEvent({ id: params.id })
    if (event) {
      return NextResponse.json(event)
    }
  }
  return NextResponse.next()
}
