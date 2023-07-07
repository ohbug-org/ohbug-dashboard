'use client'

import type { Project } from '@prisma/client'
import Frame from './frame'
import Wrapper from '~/components/wrapper'
import ThemeBox from '~/components/themeBox'

interface Props {
  project: Project
}

export default function Mock({ project }: Props) {
  return (
    <ThemeBox bg="current">
      <Wrapper>
        <Frame project={project} />
      </Wrapper>
    </ThemeBox>
  )
}
