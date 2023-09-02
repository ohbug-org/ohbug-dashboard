'use client'

import { type Project } from '@prisma/client'
import Frame from './frame'
import Wrapper from '~/components/wrapper'


interface Props {
  project: Project
}

export default function Mock({ project }: Props) {
  return (
    <div >
      <Wrapper>
        <Frame project={project} />
      </Wrapper>
    </div>
  )
}
