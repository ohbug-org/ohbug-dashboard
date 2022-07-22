import type { FC } from 'react'
import { Fragment, forwardRef, useMemo } from 'react'
import { Box, Flex, Kbd, useColorModeValue } from '@chakra-ui/react'
import type { ActionId, ActionImpl } from 'kbar'
import { KBarResults, useMatches } from 'kbar'

interface ResultItemProps {
  action: ActionImpl | string
  active: boolean
  currentRootActionId?: ActionId | null
}
const ResultItem = forwardRef<HTMLDivElement, ResultItemProps>((
  {
    action,
    active,
    currentRootActionId,
  },
  ref,
) => {
  const activeBg = useColorModeValue('gray.100', 'dark.100')
  const activeBorderColor = useColorModeValue('black', 'white')
  if (typeof action === 'string') {
    return (
      <Box
        color="gray"
        fontSize="sm"
        p="3"
      >
        {action}
      </Box>
    )
  }

  const ancestors = useMemo(() => {
    if (!currentRootActionId) return action.ancestors
    const index = action.ancestors.findIndex(ancestor => ancestor.id === currentRootActionId)
    // +1 removes the currentRootAction; e.g.
    // if we are on the "Set theme" parent action,
    // the UI should not display "Set theme… > Dark"
    // but rather just "Dark"
    return action.ancestors.slice(index + 1)
  }, [action.ancestors, currentRootActionId])

  return (
    <Flex
      align="center"
      bg={active ? activeBg : 'transparent'}
      borderLeft="2px solid"
      borderLeftColor={active ? activeBorderColor : 'transparent'}
      cursor="pointer"
      justify="space-between"
      p="4"
      ref={ref}
    >
      <Flex
        align="center"
        gap="3"
      >
        {action.icon && action.icon}
        <Flex
          align="center"
          gap="3"
        >
          <Box>
            {
              ancestors.length > 0
                && ancestors.map(ancestor => (
                  <Fragment key={ancestor.id}>
                    <Box
                      as="span"
                      mr="2"
                      opacity="0.5"
                    >
                      {ancestor.name}
                    </Box>
                    <Box
                      as="span"
                      mr="2"
                    >
                      &rsaquo;
                    </Box>
                  </Fragment>
                ))
            }
            <span>{action.name}</span>
          </Box>
          {
            action.subtitle && (
              <Box
                as="span"
                color="dimgray"
                fontSize="sm"
              >
                {action.subtitle}
              </Box>
            )
          }
        </Flex>
      </Flex>
      {
        action.shortcut?.length
          ? (
            <Box
              aria-hidden
              display="grid"
              gap="1"
              gridAutoFlow="column"
            >
              {
                action.shortcut.map(sc => (
                  <Kbd
                    fontSize="md"
                    key={sc}
                    px="2"
                    py="1"
                  >
                    {sc}
                  </Kbd>
                ))
              }
            </Box>
          )
          : null
      }
    </Flex>
  )
})
ResultItem.displayName = 'ResultItem'

const Results: FC = () => {
  const { results, rootActionId } = useMatches()

  return (
    <Box
      as={KBarResults}
      items={results}
      onRender={
        ({ item, active }: any) => (
          <ResultItem
            action={item}
            active={active}
            currentRootActionId={rootActionId}
          />
        )
      }
    />
  )
}

export default Results
