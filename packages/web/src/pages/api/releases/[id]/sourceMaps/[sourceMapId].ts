import { readFile } from 'node:fs/promises'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '~/libs/middleware'
import { serviceGetRelease } from '~/services/releases'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const auth = await getAuth(req, res)
  if (!auth) return

  const { query } = req
  const releaseId = parseInt(query.id as string)
  const sourceMapId = query.sourceMapId as string

  const release = await serviceGetRelease({ id: releaseId })
  const sourceMaps = release.sourceMaps as Array<any>
  const sourceMap = sourceMaps?.find(({ id }) => id === sourceMapId)
  if (sourceMap.path) {
    const buffer = await readFile(sourceMap.path)
    res.setHeader('Content-Type', sourceMap.mimetype)
    res.setHeader('Content-Disposition', `attachment; filename=${sourceMap.originalname}`)
    res.status(200).send(buffer)
  }
  else {
    res.status(404).end()
  }
}
