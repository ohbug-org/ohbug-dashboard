'use client'

import type { FC } from 'react'
import { Box, Button, Center, Link } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { RiExternalLinkLine } from 'react-icons/ri'
import NextLink from 'next/link'
import useCurrentProject from '~/hooks/useCurrentProject'

const EmptyIssues: FC = () => {
  const { projectId } = useCurrentProject()
  const t = useTranslations('Issues.Empty')
  return (
    <Center
      flexDirection="column"
      gap="4"
      p="6"
    >
      <Box>{t('gettingStarted')}</Box>
      <Box>
        <Link
          href="https://ohbug.net/guide/getting-started.html"
          target="_blank"
        >
          <Button
            rightIcon={
              <RiExternalLinkLine/>
            }
          >
            Getting Started
          </Button>
        </Link>
      </Box>
      <Box>{t('getApiKey')}</Box>
      <NextLink
        href={`/${projectId}/settings`}
        passHref
      >
        <Button variant="link">Get apiKey</Button>
      </NextLink>
    </Center>
  )
}

export default EmptyIssues
