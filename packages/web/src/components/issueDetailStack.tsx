import type { FC } from 'react'
import type { OhbugEventLike } from 'common'
import { Box } from '@chakra-ui/react'
import StackInfo from './stackInfo'
import ThemeBox from './themeBox'
import Wrapper from './wrapper'
import { renderStringOrJson } from '~/libs/utils'

interface Props {
  event: OhbugEventLike
}

const IssueDetailStack: FC<Props> = ({ event }) => {
  return (
    <ThemeBox bg="current">
      <Wrapper>
        {/* all */}
        {
          event.detail.message && (
            <Box mb="4">
              {renderStringOrJson(event.detail.message)}
            </Box>
          )
        }
        {/* unhandledrejectionError */}
        {/* uncaughtError */}
        {
          event.detail.stack && (
            <Box mb="4">
              <StackInfo
                source={event?.source}
                stack={event.detail.stack}
              />
            </Box>
          )
        }
        {/* resourceError */}
        {
          event?.detail.selector && (
            <Box mb="4">
              {renderStringOrJson(event.detail)}
            </Box>
          )
        }
        {/* ajaxError */}
        {/* fetchError */}
        {
          event?.type === 'ajaxError' && (
            <Box mb="4">
              {renderStringOrJson(event.detail)}
            </Box>
          )
        }
        {/* websocketError */}
        {
          event?.type === 'websocketError' && (
            <Box mb="4">
              {renderStringOrJson(event.detail)}
            </Box>
          )
        }
      </Wrapper>
    </ThemeBox>
  )
}

export default IssueDetailStack
