import fs from 'node:fs/promises'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '~/libs/middleware'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const auth = await getAuth(req, res)
  if (!auth) return res.status(401).json('Unauthorized')

  const { data } = req.body
  try {
    const name = req.query.name![0]

    // @ts-expect-error need to do this
    const result = await (fs[name]?.(...data))
    return res.status(200).json({
      data: result,
      success: true,
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      errorMessage: `${error}`,
    })
  }
}
