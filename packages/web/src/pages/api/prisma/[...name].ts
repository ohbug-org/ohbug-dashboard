import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '~/libs/middleware'
import { getPrisma } from '~/db'

const methods = [
  '$queryRaw',
  '$queryRawUnsafe',
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const auth = await getAuth(req, res)
  if (!auth) return res.status(401).json('Unauthorized')

  const prisma = getPrisma()
  const { operate, data } = req.body
  try {
    const name = req.query.name![0]
    if (methods.includes(name)) {
      // @ts-expect-error need to do this
      const result = await prisma[name](data)
      if (result) {
        return res.status(200).json({
          data: result,
          success: true,
        })
      }
    }
    // @ts-expect-error need to do this
    const result = await prisma[name][operate](data)
    if (result) {
      return res.status(200).json({
        data: result,
        success: true,
      })
    }
    return res.status(400).json({
      success: false,
      errorMessage: `NotFound: ${name}`,
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      errorMessage: `${error}`,
    })
  }
}
