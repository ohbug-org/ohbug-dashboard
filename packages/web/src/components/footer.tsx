import { Box, Flex, Icon, Link } from '@chakra-ui/react'
import type { FC } from 'react'
import { RiGithubFill } from 'react-icons/ri'
import Logo from './logo'
import Intl from './intl'
import Theme from './theme'
import ThemeBox from './themeBox'

const Footer: FC = () => {
  return (
    <Flex
      align="center"
      justify="space-between"
    >
      <Logo />

      <Box>
        <Link
          href="https://github.com/ohbug-org"
          target="_blank"
        >
          <Icon
            as={RiGithubFill}
            h="6"
            w="6"
          />
        </Link>
      </Box>

      <Flex
        align="center"
        gap="2"
      >
        <Intl />
        <Theme />
        <ThemeBox
          color="gray"
          fontSize="sm"
        >
          v{process.env.NEXT_PUBLIC_VERSION}
        </ThemeBox>
      </Flex>
    </Flex>
  )
}

export default Footer
