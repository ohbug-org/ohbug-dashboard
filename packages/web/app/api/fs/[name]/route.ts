import fs from 'node:fs/promises'
import { NextResponse } from 'next/server'
import { getAuth } from '~/libs/middleware'

export async function POST(request: Request, { params }: { params: { name: string } }) {
  const auth = await getAuth()
  if (!auth) return NextResponse.next()

  try {
    const { data } = await request.json()
    // @ts-expect-error need to do this
    const result = await (fs[params.name]?.(...data))
    return NextResponse.json({
      data: result,
      success: true,
    })
  }
  catch (error) {
    return NextResponse.json({
      success: false,
      errorMessage: `${error}`,
    }, { status: 500 })
  }
}
