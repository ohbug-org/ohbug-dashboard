'use client'

import { Badge, Box, Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/react'
import type { FC } from 'react'
import { useMemo } from 'react'
import type { Issue, OhbugEventLike } from 'common'
import { useTranslations } from 'next-intl'
import Title from './title'
import IssueDetailTabs from './issueDetailTabs'
import { renderStringOrJson } from '~/libs/utils'

interface Props {
  issue: Issue
  event: OhbugEventLike
}

const IssueDetailTitle: FC<Props> = ({ issue, event }) => {
  const t = useTranslations('Event')
  const metadata = useMemo(() => JSON.parse(issue.metadata) || {}, [issue])
  return (
    <Title
      bg="current"
      bottomNodes={
        <IssueDetailTabs event={event} />
      }
      position="sticky"
      rightNodes={
        (
          <StatGroup w="xs">
            <Stat>
              <StatLabel>{t('titleEvents')}</StatLabel>
              <StatNumber>{issue._count?.events}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>{t('titleUsers')}</StatLabel>
              <StatNumber>{issue._count?.users}</StatNumber>
            </Stat>
          </StatGroup>
        )
      }
      top="48px"
      zIndex="docked"
    >
      <Box>
        <Box
          as="a"
          noOfLines={2}
        >
          <Box
            as="span"
            fontWeight="semibold"
            mr="2"
          >
            {issue.type}
          </Box>
          {
            issue.releaseStage === 'mock' && (
              <Badge
                colorScheme="red"
                mr="2"
              >
                Mock
              </Badge>
            )
          }
          <Box
            as="code"
            textColor="gray.400"
          >
            {renderStringOrJson(metadata.filename ?? metadata.others)}
          </Box>
        </Box>
        <Box
          noOfLines={[1, 2]}
          textColor="gray.400"
        >
          {
            metadata.message && (
              <code>
                {renderStringOrJson(metadata.message)}
              </code>
            )
          }
        </Box>
      </Box>
    </Title>
  )
}

export default IssueDetailTitle
