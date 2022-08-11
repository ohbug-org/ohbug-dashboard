import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '~/libs/middleware'
import { getPrisma } from '~/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const auth = await getAuth(req, res)
  if (!auth) return res.status(401).json('Unauthorized')

  const prisma = getPrisma()
  const table = req.query.table?.[0]
  const { operate, data } = req.body
  try {
    // @ts-expect-error need to do this
    const result = await prisma[table][operate](data)
    if (result) {
      return res.status(200).json({
        data: result,
        success: true,
      })
    }
    return res.status(400).json({
      success: false,
      errorMessage: `NotFound: ${table}`,
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      errorMessage: `${error}`,
    })
  }
}
