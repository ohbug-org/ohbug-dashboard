import { Box, Button, Center, Link } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'
import { RiExternalLinkLine } from 'react-icons/ri'

const EmptyIssues: FC = () => {
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
    </Center>
  )
}

export default EmptyIssues
