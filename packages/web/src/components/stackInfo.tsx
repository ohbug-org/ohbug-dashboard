import type { FC, ReactElement, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import type { Result } from 'source-map-trace'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, FormControl, FormLabel, Switch, Text } from '@chakra-ui/react'

interface Props {
  stack: string
  source?: Result
}

const StackInfo: FC<Props> = ({ stack, source }) => {
  const [toggle, setToggle] = useState<'raw' | 'code'>('raw')

  const title = useMemo(
    () => (
      <Box>
        <Text
          as="code"
          fontWeight="bold"
          mx="1"
        >
          {source?.parsed?.source}
        </Text>
        <Text
          display="inline-block"
          m="0"
          mx="1"
          opacity="0.6"
        >
          in
        </Text>
        <Text
          as="code"
          fontWeight="bold"
          mx="1"
        >
          {source?.parsed?.name}
        </Text>
        <Text
          display="inline-block"
          m="0"
          mx="1"
          opacity="0.6"
        >
          at line
        </Text>
        <Text
          as="code"
          fontWeight="bold"
          mx="1"
        >
          {source?.parsed?.line}:
        </Text>
        <Text
          as="code"
          fontWeight="bold"
          mx="1"
        >
          {source?.parsed?.column}
        </Text>
      </Box>
    ),
    [source],
  )
  const content = useMemo((): ReactNode => {
    switch (toggle) {
      case 'raw':
        return typeof stack === 'string' ? stack : JSON.stringify(stack)
      case 'code':
        return (
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    flex="1"
                    textAlign="left"
                  >
                    {title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box
                  as="ol"
                  listStylePosition="inside"
                  listStyleType="decimal"
                  m="0"
                  py="2"
                  start={source?.code?.[0].number}
                >
                  {
                    source?.code?.map(({ code, number, highlight }): ReactElement => {
                      return (
                        <Box
                          as="li"
                          bg={highlight ? 'red.500' : 'inherit'}
                          key={number}
                          pl="6"
                          textColor={highlight ? 'white' : 'inherit'}
                        >
                          <span>{code}</span>
                        </Box>
                      )
                    })
                  }
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        )
      default:
        return null
    }
  }, [source, stack, toggle, title])

  return (
    <Box>
      <FormControl>
        <FormLabel
          display="inline-block"
          htmlFor="switchCodeAndRaw"
        >
          {toggle === 'code' ? 'Code' : 'Raw'}
        </FormLabel>
        <Switch
          checked={toggle === 'code'}
          id="switchCodeAndRaw"
          onChange={e => setToggle(e.target.checked ? 'code' : 'raw')}
          size="md"
        />
      </FormControl>

      <Box
        as="pre"
        mt="4"
        wordBreak="break-word"
      >
        {content}
      </Box>
    </Box>
  )
}

export default StackInfo
