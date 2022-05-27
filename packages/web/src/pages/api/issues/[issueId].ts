// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Issue } from '@prisma/client'
import { prisma } from '~/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Issue>,
) {
  const issue = await prisma.issue.findUnique({ where: { id: Number(req.query.issueId as string) } })
  if (issue)
    res.status(200).json(issue)
  else
    res.end(`Issue ${req.query.issueId} not found`)
}
