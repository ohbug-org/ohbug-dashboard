'use client'

import { Box, Flex } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'

interface Props {
  title: string
  value: string | number
  unit?: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}

const IntroduceChart: FC<Props> = ({ title, value, unit, description, actions, children }) => {
  return (
    <Flex
      align="center"
      gap="2"
      w="full"
    >
      <Flex
        direction="column"
        w="200px"
      >
        <Box
          fontSize="xl"
          fontWeight="bold"
        >
          {title}
        </Box>
        <Box
          fontSize="3xl"
        >
          {value}
          {unit}
        </Box>
        <Box textColor="gray">{description}</Box>
        <Box>{actions}</Box>
      </Flex>
      <Box flex="1">{children}</Box>
    </Flex>
  )
}

export default IntroduceChart
