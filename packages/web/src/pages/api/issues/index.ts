// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Issue } from '@prisma/client'
import { prisma } from '~/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Issue[]>,
) {
  const skip = Number(req.query.skip as string) || 0
  const take = Number(req.query.take as string) || 100
  const issues = await prisma.issue.findMany({
    skip,
    take,
  })
  res.status(200).json(issues)
}
