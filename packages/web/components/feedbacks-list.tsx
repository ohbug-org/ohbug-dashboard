'use client'

import Link from 'next/link'
import dayjs from 'dayjs'
import { type FC } from 'react'
import { type EventUser, type Feedback } from '@prisma/client'
import { renderStringOrJson } from '~/libs/utils'
import useCurrentProject from '~/hooks/use-current-project'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'

interface Props {
  feedbacks?: (Feedback & { user: EventUser })[]
}

const FeedbacksList: FC<Props> = ({ feedbacks }) => {
  const { projectId } = useCurrentProject()

  return (
    <Table className="rounded-md border">
      <TableHeader>
        <TableRow>
          <TableHead>feedback</TableHead>
          <TableHead>createdAt</TableHead>
          <TableHead>user</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          feedbacks?.map((feedback) => {
            const detail = feedback.detail as any
            return (
              <TableRow key={feedback.id}>
                <TableCell>
                  <Link href={`/${projectId}/feedbacks/${feedback.id}`}>
                    {detail.feedback}
                  </Link>
                </TableCell>
                <TableCell>
                  {dayjs(feedback.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                </TableCell>
                <TableCell>{renderStringOrJson(feedback.user)}</TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}

export default FeedbacksList
