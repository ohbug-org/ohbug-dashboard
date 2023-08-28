'use client'

import { type ReactNode } from 'react'
import { type BoxProps, Box } from '~/components/ui/box'
import { Card, CardHeader, CardTitle } from '~/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"

interface Props extends BoxProps {
  title?: string
  head?: ReactNode
  collapse?: ReactNode
  collapseTitle?: ReactNode
  children?: ReactNode
}

export default function CardSection({ title, head, collapse, collapseTitle, children, ...props }: Props) {
  return (
    <Box {...props}>
      <h2 className="font-semibold">
        {title}
      </h2>
      <Card className='mt-4'>
        {
          head && (
            <CardHeader>
              <CardTitle className="font-semibold">
                {head}
              </CardTitle>
            </CardHeader>
          )
        }
        {
          collapse && (
            <Accordion
              type="single"
              collapsible
            >
              <AccordionItem value='item-1'>
                <AccordionTrigger>
                  <span className='flex-1 font-semibold text-left'>
                    {collapseTitle}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {collapse}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )
        }
        {children}
      </Card>
    </Box>
  )
}
