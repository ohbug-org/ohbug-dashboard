'use client'

import { type ReactNode } from 'react'
import { Card, CardHeader, CardTitle } from '~/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion'

interface Props {
  className?: string
  title?: string
  head?: ReactNode
  collapse?: ReactNode
  collapseTitle?: ReactNode
  children?: ReactNode
}

export default function AccordionSection({ title, head, collapse, collapseTitle, children, ...props }: Props) {
  return (
    <div {...props}>
      <h2 className="font-semibold">
        {title}
      </h2>
      <Card className="mt-4">
        {
          head
            ? (
              <CardHeader>
                <CardTitle className="font-semibold">
                  {head}
                </CardTitle>
              </CardHeader>
              )
            : null
        }
        {
          collapse
            ? (
              <Accordion
                collapsible
                type="single"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <span className="flex-1 font-semibold text-left">
                      {collapseTitle}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {collapse}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              )
            : null
        }
        {children}
      </Card>
    </div>
  )
}
