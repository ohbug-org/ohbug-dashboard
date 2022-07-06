import type { GetServerSideProps, NextPage } from 'next'
import { Flex } from '@chakra-ui/react'
import type { Release } from '@prisma/client'
import { serviceGetRelease } from '~/services/releases'

interface Props {
  release: Release
}

export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
  const releaseId = context.query.releaseId as string
  const release = await serviceGetRelease({ id: parseInt(releaseId) })
  return { props: { release } }
}

const Detail: NextPage<Props> = ({ release }) => {
  console.warn(release)

  return (
    <Flex
      flexDirection="column"
      gap="6"
    />
  )
}

export default Detail
