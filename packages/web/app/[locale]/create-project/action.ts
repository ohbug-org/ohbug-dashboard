'use server'

import crypto from 'node:crypto'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { getConfig } from 'config'
import { type z } from 'zod'
import schema from './schema'
import { getAuth } from '~/libs/middleware'
import { serviceCreateProject } from '~/services/projects'

export default async function submit(formData: z.infer<typeof schema>) {
  const secret = getConfig().secret?.apikey ?? 'ohbug-apikey-s3cret'
  const auth = await getAuth()
  if (!auth) {
    return NextResponse.redirect('/auth/signin', { status: 302 })
  }
  const project = schema.parse(formData)

  const apiKey = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(formData) + Date.now())
    .digest('hex')
  await serviceCreateProject({ ...project, apiKey }, auth.user)

  return redirect('/')
}
