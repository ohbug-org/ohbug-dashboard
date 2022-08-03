import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import dayjs from 'dayjs'
import type { FC } from 'react'
import type { Feedback } from '@prisma/client'
import { renderStringOrJson } from '~/libs/utils'

interface Props {
  feedbacks?: Feedback[]
}

const FeedbacksList: FC<Props> = ({ feedbacks }) => {
  return (
    <TableContainer>
      <Table className="w-full table table-compact">
        <Thead>
          <Tr>
            <Th>createdAt</Th>
            <Th>feedback</Th>
            <Th>user</Th>
            <Th>selected element</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            feedbacks?.map((feedback) => {
              const detail = feedback.detail as any
              return (
                <Tr key={feedback.id}>
                  <Td>
                    {dayjs(feedback.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                  </Td>
                  <Td>{detail.feedback}</Td>
                  <Td>{renderStringOrJson(feedback.user)}</Td>
                  <Td>
                    <img
                      alt="selected element"
                      src={detail.dataURL}
                    />
                  </Td>
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
