import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import dayjs from 'dayjs'
import Link from 'next/link'
import type { FC } from 'react'
import type { Event } from '@prisma/client'
import { renderStringOrJson } from '~/libs/utils'

interface Props {
  events?: Event[]
}

const EventsList: FC<Props> = ({ events }) => {
  return (
    <TableContainer>
      <Table className="w-full table table-compact">
        <Thead>
          <Tr>
            <Th>description</Th>
            <Th>appType</Th>
            <Th>appVersion</Th>
            <Th>category</Th>
            <Th>releaseStage</Th>
            <Th>user</Th>
            <Th>sdk</Th>
            <Th>device</Th>
            <Th>metadata</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            events?.map(event => (
              <Tr key={event.id}>
                {/* description */}
                <Td>
                  <Link href={`/issues/${event.issueId}/?eventId=${event.id}`}>
                    <a>{dayjs(event.createdAt).format('YYYY-MM-DD HH:mm:ss')}</a>
                  </Link>
                  <div>{event.type}: {renderStringOrJson((event.detail as any).message ?? event.detail)}</div>
                </Td>
                {/* appType */}
                <Td>{event.appType}</Td>
                {/* appVersion */}
                <Td>{event.appVersion}</Td>
                {/* category */}
                <Td>{event.category}</Td>
                {/* releaseStage */}
                <Td>{event.releaseStage}</Td>
                {/* user */}
                <Td>{renderStringOrJson(event.user)}</Td>
                {/* sdk */}
                <Td>{renderStringOrJson(event.sdk)}</Td>
                {/* device */}
                <Td>{renderStringOrJson(event.device)}</Td>
                {/* metadata */}
                <Td>{renderStringOrJson(event.metadata)}</Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default EventsList
