import crypto from 'node:crypto'
import { NextResponse } from 'next/server'
import { getConfig } from 'config'
import { getAuth } from '~/libs/middleware'
import { serviceCreateProject } from '~/services/projects'

export async function POST(request: Request) {
  const secret = getConfig().secret?.apikey ?? 'ohbug-apikey-s3cret'
  const auth = await getAuth()
  if (!auth) {
    return NextResponse.redirect('/auth/signin', { status: 302 })
  }
  const project = await request.json()
  const apiKey = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(project) + new Date().getTime())
    .digest('hex')
  await serviceCreateProject({ ...project, apiKey }, auth.user)

  return NextResponse.redirect('/')
}
