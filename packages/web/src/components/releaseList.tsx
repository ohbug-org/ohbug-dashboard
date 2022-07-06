import type { FC } from 'react'
import NextLink from 'next/link'
import dayjs from 'dayjs'
import { Box, Flex, Link, Text, Tooltip } from '@chakra-ui/react'
import type { Release } from '@prisma/client'
import useCurrentProject from '~/hooks/useCurrentProject'

interface Props {
  releases: Release[]
}
const ReleaseList: FC<Props> = ({ releases }) => {
  const { projectId } = useCurrentProject()

  return (
    <Box
      h="full"
      overflowX="hidden"
      overflowY="auto"
      rounded="lg"
      w="full"
    >
      {
        releases.map(release => (
          <Flex key={release.id}>
            <Flex
              direction="column"
              flex="1"
            >
              <Link fontWeight="semibold">{release.appVersion}</Link>
              <Text color="dimgray">{release.appType}</Text>
            </Flex>
            <Flex
              direction="column"
              flex="1"
            >
              <Text fontWeight="semibold">sourceMap files</Text>
              <NextLink href={`/${projectId}/releases/${release.id}/sourceMaps`}>
                <Link fontWeight="semibold">{(release.sourceMaps as Array<any>)?.length}</Link>
              </NextLink>
            </Flex>
            <Flex
              align="center"
              flex="1"
              justify="end"
            >
              <Tooltip label={dayjs(release.createdAt).format()}>
                <Text color="gray">{dayjs(release.createdAt).fromNow()}</Text>
              </Tooltip>
            </Flex>
          </Flex>
        ))
      }
    </Box>
  )
}

export default ReleaseList
