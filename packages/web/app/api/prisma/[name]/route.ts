import { NextResponse } from 'next/server'
import { getAuth } from '~/libs/middleware'
import { getPrisma } from '~/db'

const methods = [
  '$queryRaw',
  '$queryRawUnsafe',
]

export async function POST(request: Request, { params }: { params: { name: string } }) {
  const auth = await getAuth()
  if (!auth) return NextResponse.next()

  try {
    const prisma = getPrisma()
    const { operate, data } = await request.json()
    if (methods.includes(params.name)) {
      // @ts-expect-error need to do this
      const result = await prisma[params.name](data)
      if (result) {
        return NextResponse.json({
          data: result,
          success: true,
        })
      }
    }
    // @ts-expect-error need to do this
    const result = await prisma[params.name][operate](data)
    if (result) {
      return NextResponse.json({
        data: result,
        success: true,
      })
    }
    return NextResponse.json({
      success: false,
      errorMessage: `NotFound: ${params.name}`,
    }, { status: 404 })
  }
  catch (error) {
    return NextResponse.json({
      success: false,
      errorMessage: `${error}`,
    }, { status: 500 })
  }
}
