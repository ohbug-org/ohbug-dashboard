'use client'

import { Flex, IconButton, Link, Text } from '@chakra-ui/react'
import type { Release } from '@prisma/client'
import { useMemo } from 'react'
import { formatBytes } from 'common'
import { RiFileDownloadLine } from 'react-icons/ri'
import ThemeBox from '~/components/themeBox'
import Wrapper from '~/components/wrapper'
import Title from '~/components/title'
import Card from '~/components/card'

interface Props {
  release: Release
}

export default function SourceMaps({ release }: Props) {
  const sourceMaps = useMemo(() => (release.sourceMaps as Array<any>) ?? [], [release.sourceMaps])

  return (
    <Flex flexDirection="column">
      <Title>SourceMaps</Title>

      <ThemeBox bg="gray">
        <Wrapper>
          <Card>
            {
              sourceMaps?.map(sourceMap => (
                <Flex
                  align="center"
                  justify="space-between"
                  key={sourceMap.filename}
                  w="full"
                >
                  <Flex direction="column">
                    <Text fontWeight="semibold">{sourceMap.originalname}</Text>
                    <Text color="gray">{sourceMap.mimetype}</Text>
                  </Flex>
                  <Flex
                    align="center"
                    gap="2"
                  >
                    <Text color="gray">{formatBytes(sourceMap.size)}</Text>
                    <Link href={`/api/releases/${release.id}/sourceMaps/${sourceMap.id}`}>
                      <IconButton
                        aria-label="download file"
                        as={RiFileDownloadLine}
                        size="xs"
                        variant="ghost"
                      />
                    </Link>
                  </Flex>
                </Flex>
              ))
            }
          </Card>
        </Wrapper>
      </ThemeBox>
    </Flex>
  )
}
