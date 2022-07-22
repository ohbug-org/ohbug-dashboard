import { useMemo } from 'react'
import type { Action } from 'kbar'
import { useRouter } from 'next/router'
import { Icon, useColorMode } from '@chakra-ui/react'
import { RiDiscordFill, RiGithubFill, RiHomeFill, RiMoonFill, RiSunFill } from 'react-icons/ri'

export function useSearchBarActions() {
  const router = useRouter()
  const { setColorMode } = useColorMode()
  const staticActions: Action[] = [
    {
      id: 'home',
      name: 'Home',
      section: 'Scope',
      shortcut: [],
      keywords: 'home',
      icon: (
        <Icon
          as={RiHomeFill}
          h="5"
          w="5"
        />
      ),
      perform: () => router.push('/'),
    },
    {
      id: 'github',
      name: 'Github',
      subtitle: 'ohbug-org',
      section: 'Social',
      shortcut: [],
      keywords: 'github, source code, open, code',
      icon: (
        <Icon
          as={RiGithubFill}
          h="5"
          w="5"
        />
      ),
      perform: () => window.open('https://github.com/ohbug-org/ohbug'),
    },
    {
      id: 'discord',
      name: 'Discord',
      subtitle: 'Join us!',
      section: 'Social',
      shortcut: [],
      keywords: 'chat, community, join',
      icon: (
        <Icon
          as={RiDiscordFill}
          h="5"
          w="5"
        />
      ),
      perform: () => window.open('https://discord.gg/FmxaBSBumM'),
    },

    {
      id: 'darkTheme',
      name: 'Dark',
      section: 'Theme',
      keywords: 'dark',
      icon: (
        <Icon
          as={RiMoonFill}
          h="5"
          w="5"
        />
      ),
      shortcut: [],
      perform: () => setColorMode('dark'),
    },
    {
      id: 'lightTheme',
      name: 'Light',
      section: 'Theme',
      keywords: 'light',
      shortcut: [],
      icon: (
        <Icon
          as={RiSunFill}
          h="5"
          w="5"
        />
      ),
      perform: () => setColorMode('light'),
    },
  ]
  const actions = useMemo(() => [...staticActions], [staticActions])
  return { actions }
}
