import { Flex, HStack, Icon, Link } from '@chakra-ui/react'
import type { FC } from 'react'
import { RiDiscordFill, RiGithubFill } from 'react-icons/ri'
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
      <HStack spacing="4">
        <Logo />
        <ThemeBox
          color="gray"
          fontSize="sm"
        >
          v{process.env.NEXT_PUBLIC_VERSION}
        </ThemeBox>
      </HStack>

      <HStack spacing="4">
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
        <Link
          href="https://discord.gg/FmxaBSBumM"
          target="_blank"
        >
          <Icon
            as={RiDiscordFill}
            h="6"
            w="6"
          />
        </Link>
      </HStack>

      <HStack spacing="4">
        <Intl />
        <Theme />
      </HStack>
    </Flex>
  )
}

export default Footer
