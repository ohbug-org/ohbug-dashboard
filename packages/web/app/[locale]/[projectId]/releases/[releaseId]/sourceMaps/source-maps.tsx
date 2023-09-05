'use client'

import { useMemo } from 'react'
import { formatBytes } from 'common'
import { type Release } from '@prisma/client'
import Link from 'next/link'
import Wrapper from '~/components/wrapper'
import Title from '~/components/title'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'

interface Props {
  release: Release
}

export default function SourceMaps({ release }: Props) {
  const sourceMaps = useMemo(() => (release.sourceMaps as Array<any>) ?? [], [release.sourceMaps])

  return (
    <div className="flex flex-col">
      <Title>SourceMaps</Title>

      <Wrapper>
        <Card>
          <CardHeader>
            <CardTitle>
              SourceMaps
            </CardTitle>
          </CardHeader>
          <CardContent>
            {
              sourceMaps?.map(sourceMap => (
                <div
                  key={sourceMap.filename}
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{sourceMap.originalname}</span>
                    <span className="text-stone-500">{sourceMap.mimetype}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-stone-500">{formatBytes(sourceMap.size)}</span>
                    <Link href={`/api/releases/${release.id}/sourceMaps/${sourceMap.id}`}>
                      <Button
                        size="icon"
                        variant="outline"
                      >
                        <i className="i-ri-file-download-line" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            }
          </CardContent>
        </Card>
      </Wrapper>
    </div>
  )
}