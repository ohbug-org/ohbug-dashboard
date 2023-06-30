'use client'

import { Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import dayjs from 'dayjs'
import type { FC } from 'react'
import type { EventUser, Feedback } from '@prisma/client'
import NextLink from 'next/link'
import { renderStringOrJson } from '~/libs/utils'
import useCurrentProject from '~/hooks/useCurrentProject'

interface Props {
  feedbacks?: (Feedback & { user: EventUser })[]
}

const FeedbacksList: FC<Props> = ({ feedbacks }) => {
  const { projectId } = useCurrentProject()

  return (
    <TableContainer>
      <Table className="w-full table table-compact">
        <Thead>
          <Tr>
            <Th>feedback</Th>
            <Th>createdAt</Th>
            <Th>user</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            feedbacks?.map((feedback) => {
              const detail = feedback.detail as any
              return (
                <Tr key={feedback.id}>
                  <Td>
                    <NextLink
                      href={`/${projectId}/feedbacks/${feedback.id}`}
                      passHref
                    >
                      <Link>{detail.feedback}</Link>
                    </NextLink>
                  </Td>
                  <Td>
                    {dayjs(feedback.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                  </Td>
                  <Td>{renderStringOrJson(feedback.user)}</Td>
                </Tr>
              )
            })
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default FeedbacksList
