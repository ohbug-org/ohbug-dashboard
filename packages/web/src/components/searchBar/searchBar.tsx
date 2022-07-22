import type { FC } from 'react'
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarSearch,
  VisualState,
  useKBar,
} from 'kbar'
import { Box } from '@chakra-ui/react'
import ThemeBox from '../themeBox'
import Results from './results'

const SearchBar: FC = () => {
  const { visible } = useKBar(state => ({ visible: state.visualState !== VisualState.hidden }))

  return (
    <KBarPortal>
      <ThemeBox
        acrylic
        bg="current"
        bottom="0"
        display={visible ? 'block' : 'none'}
        left="0"
        position="fixed"
        right="0"
        top="0"
      >
        <KBarPositioner>
          <ThemeBox
            as={KBarAnimator}
            bg="current"
            borderRadius="md"
            boxShadow="md"
            color="current"
            maxW="600px"
            overflow="hidden"
            w="full"
          >
            <Box
              as={KBarSearch}
              border="none"
              fontSize="lg"
              outline="none"
              p="4"
              w="full"
            />
            <Results />
          </ThemeBox>
        </KBarPositioner>
      </ThemeBox>
    </KBarPortal>
  )
}

export default SearchBar
