import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'

const Alerts: NextPage = () => {
  return (
    <Box>
      <Title>Alerts</Title>

      <Wrapper
        display="flex"
        flexDirection="column"
        gap="12"
        py="12"
      >
        alerts
      </Wrapper>
    </Box>
  )
}

export default Alerts
