import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { Icon, useColorMode } from '@chakra-ui/react'
import { RiDiscordLine, RiGithubLine, RiHomeLine, RiMoonLine, RiSunLine } from 'react-icons/ri'

interface Action {
  label: string
  value: string
  subtitle?: string
  section: string
  shortcut: string[]
  keywords: string[]
  icon: ReactNode
  perform: (currentAction: Action) => void
}

export function useSearchBarActions() {
  const router = useRouter()
  const { setColorMode } = useColorMode()
  const actions = useMemo<Action[]>(() => [
    {
      value: 'home',
      label: 'Home',
      section: 'Scope',
      shortcut: [],
      keywords: ['home'],
      icon: (
        <Icon as={RiHomeLine}/>
      ),
      perform: () => router.push('/'),
    },
    {
      value: 'github',
      label: 'Github',
      subtitle: 'ohbug-org',
      section: 'Social',
      shortcut: [],
      keywords: ['github', 'source code', 'open', 'code'],
      icon: (
        <Icon as={RiGithubLine}/>
      ),
      perform: () => window.open('https://github.com/ohbug-org/ohbug'),
    },
    {
      value: 'discord',
      label: 'Discord',
      subtitle: 'Join us!',
      section: 'Social',
      shortcut: [],
      keywords: ['chat', 'community', 'join'],
      icon: (
        <Icon as={RiDiscordLine}/>
      ),
      perform: () => window.open('https://discord.gg/FmxaBSBumM'),
    },

    {
      value: 'darkTheme',
      label: 'Dark',
      section: 'Theme',
      keywords: ['dark'],
      icon: (
        <Icon as={RiMoonLine}/>
      ),
      shortcut: [],
      perform: () => setColorMode('dark'),
    },
    {
      value: 'lightTheme',
      label: 'Light',
      section: 'Theme',
      keywords: ['light'],
      shortcut: [],
      icon: (
        <Icon as={RiSunLine}/>
      ),
      perform: () => setColorMode('light'),
    },
  ], [])
  return { actions }
}
