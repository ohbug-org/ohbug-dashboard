'use client'

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Heading, Text } from '@chakra-ui/react'
import { type FC, type ReactNode } from 'react'
import Card from './card'
import { type BoxProps } from './ui'
import { Box } from './ui'

interface Props extends BoxProps {
  title?: string
  head?: ReactNode
  collapse?: ReactNode
  collapseTitle?: ReactNode
  children?: ReactNode
}

const CardSection: FC<Props> = ({ title, head, collapse, collapseTitle, children, ...props }) => {
  return (
    <div {...props}>
      <h2 className="font-semibold">
        {title}
      </h2>
      <Card
        mt="4"
        variant="shadow"
      >
        {
          head && (
            <Box
              fontWeight="semibold"
              pb="4"
            >
              {head}
            </Box>
          )
        }
        {
          collapse && (
            <Accordion
              allowToggle
              mx="-6"
            >
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Text
                      flex="1"
                      fontWeight="semibold"
                      textAlign="left"
                    >
                      {collapseTitle}
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {collapse}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          )
        }
        {children}
      </Card>
    </div>
  )
}

export default CardSection
