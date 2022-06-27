import type { Setting } from '@prisma/client'
import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import Login from '~/components/loginButton'
import Wrapper from '~/components/wrapper'
import { serviceGetSetting } from '~/services/bootstrap'
import { serviceGetProjects } from '~/services/projects'

interface Props {
  setting: Setting | null
}

export const getServerSideProps: GetServerSideProps<Props> = async() => {
  const setting = await serviceGetSetting()
  if (!setting) {
    return {
      redirect: {
        destination: '/bootstrap',
        permanent: false,
      },
    }
  }
  const projects = await serviceGetProjects()
  if (!projects || !projects.length) {
    return {
      redirect: {
        destination: '/create-project',
        permanent: false,
      },
    }
  }
  return { props: { setting } }
}

const Home: NextPage<Props> = () => {
  return (
    <Wrapper>
      <Link href="/issues"><a>go to issues</a></Link>

      <Login />
    </Wrapper>
  )
}

export default Home
