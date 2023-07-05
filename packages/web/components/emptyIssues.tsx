'use client'

import type { FC } from 'react'
import { Box, Button, Center } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { useTranslations } from 'next-intl'
import { RiExternalLinkLine } from 'react-icons/ri'
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
      <Link
        href={`/${projectId}/settings`}
      >
        Get apiKey
      </Link>
      <Box>{t('needMockData')}</Box>
      <Link
        href={`/${projectId}/mock`}
      >
        Mock
      </Link>
    </Center>
  )
}

export default EmptyIssues
