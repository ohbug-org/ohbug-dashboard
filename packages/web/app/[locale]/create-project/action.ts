'use server'

import { redirect } from 'next/navigation'
import crypto from 'node:crypto'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getConfig } from 'config'
import { getAuth } from '~/libs/middleware'
import { serviceCreateProject } from '~/services/projects'
import schema from './schema'

export default async function submit(formData: z.infer<typeof schema>) {
  console.log('formData: ', formData);
  const secret = getConfig().secret?.apikey ?? 'ohbug-apikey-s3cret'
  const auth = await getAuth()
  if (!auth) {
    return NextResponse.redirect('/auth/signin', { status: 302 })
  }
  const project = schema.parse(formData)

  const apiKey = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(formData) + new Date().getTime())
    .digest('hex')
  await serviceCreateProject({ ...project, apiKey }, auth.user)

  return redirect('/')
}
