import { readFile } from 'node:fs/promises'
import { NextResponse } from 'next/server'
import { getAuth } from '~/libs/middleware'
import { serviceGetRelease } from '~/services/releases'

export async function GET(_: Request, { params }: { params: { id: string; sourceMapId: string } }) {
  const auth = await getAuth()
  if (!auth) return NextResponse.next()

  const sourceMapId = params.sourceMapId
  const releaseId = parseInt(params.id as string)

  const release = await serviceGetRelease({ id: releaseId })
  const sourceMaps = release.sourceMaps as Array<any>
  const sourceMap = sourceMaps?.find(({ id }) => id === sourceMapId)
  if (sourceMap.path) {
    const buffer = await readFile(sourceMap.path)
    return new Response(buffer, {
      headers: {
        'Content-Type': sourceMap.mimetype,
        'Content-Disposition': `attachment; filename=${sourceMap.originalname}`,
      },
    })
  }
  else {
    return NextResponse.json({ success: false, errorMessage: 'Internal Server Error' }, { status: 404 })
  }
}
