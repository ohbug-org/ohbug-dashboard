import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Heading, Text } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'
import Card from './card'
import type { ThemeBoxProps } from './themeBox'
import ThemeBox from './themeBox'

interface Props extends ThemeBoxProps {
  title?: string
  head?: ReactNode
  collapse?: ReactNode
  collapseTitle?: ReactNode
  children?: ReactNode
}

const CardSection: FC<Props> = ({ title, head, collapse, collapseTitle, children, ...props }) => {
  return (
    <ThemeBox {...props}>
      <Heading
        fontWeight="semibold"
        size="md"
      >
        {title}
      </Heading>
      <Card
        mt="4"
        variant="shadow"
      >
        {
          head && (
            <Text
              fontWeight="semibold"
              pb="4"
            >
              {head}
            </Text>
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
    </ThemeBox>
  )
}

export default CardSection
