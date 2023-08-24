'use client'

import { type Project } from '@prisma/client'
import Frame from './frame'
import Wrapper from '~/components/wrapper'
import { Box } from '~/components/ui/box'

interface Props {
  project: Project
}

export default function Mock({ project }: Props) {
  return (
    <Box >
      <Wrapper>
        <Frame project={project} />
      </Wrapper>
    </Box>
  )
}
