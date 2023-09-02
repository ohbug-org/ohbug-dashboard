'use client'

import Link from 'next/link'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import { type Event, type EventUser, type Feedback } from '@prisma/client'
import EventsList from '~/components/events-list'

import Wrapper from '~/components/wrapper'
import AccordionSection from '~/components/accordion-section'
import useCurrentProject from '~/hooks/use-current-project'
import Title from '~/components/title'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

interface Props {
  user: EventUser & {
    events: Event[]
    feedbacks: Feedback[]
  }
}

export default function UserId({ user }: Props) {
  const { projectId } = useCurrentProject()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Title>

          <DynamicReactJson
            src={{
              ipAddress: user.ipAddress,
              uuid: user.uuid,
              email: user.email,
              name: user.name,
              metadata: user.metadata,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            }}
          />
        </Title>

        <Wrapper>
          <AccordionSection title="Related Events">
            <EventsList events={user.events} />
          </AccordionSection>
        </Wrapper>
        <Wrapper>
          <AccordionSection title="Related Feedbacks">
            <Table className="rounded-md border">
              <TableHeader>
                <TableRow>
                  <TableHead>feedback</TableHead>
                  <TableHead>createdAt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  user.feedbacks?.map((feedback) => {
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
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </AccordionSection>
        </Wrapper>
      </div>
    </div>
  )
}
