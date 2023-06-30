'use client'

import type { FC, ReactElement } from 'react'
import { useMemo } from 'react'
import type { Result } from 'source-map-trace'
import { Box, Text } from '@chakra-ui/react'

interface Props {
  source?: Result
}

const StackInfo: FC<Props> = ({ source }) => {
  const title = useMemo(
    () => (
      <Box>
        <Text
          as="code"
          fontWeight="semibold"
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
          fontWeight="semibold"
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
          fontWeight="semibold"
          mx="1"
        >
          {source?.parsed?.line}:
        </Text>
        <Text
          as="code"
          fontWeight="semibold"
          mx="1"
        >
          {source?.parsed?.column}
        </Text>
      </Box>
    ),
    [source],
  )

  return (
    <Box
      as="pre"
      mt="4"
      wordBreak="break-word"
    >
      <Box>{title}</Box>
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
    </Box>
  )
}

export default StackInfo
