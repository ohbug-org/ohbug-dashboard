import { Avatar, Button, Center, Divider, FormControl, FormErrorMessage, Heading, Icon, Input, Stack, useToast } from '@chakra-ui/react'
import type { GetServerSideProps } from 'next'
import type { SignInResponse } from 'next-auth/react'
import { getProviders, getSession, signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import type { Dispatch, FC, SetStateAction } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RiGithubFill, RiLoginBoxLine, RiMailLine } from 'react-icons/ri'
import type { Project, User } from '@prisma/client'
import { useAtom } from 'jotai'
import { useMount } from 'react-use'
import Head from 'next/head'
import type { NextPageWithLayout } from '../_app'
import { serviceGetProject } from '~/services/projects'
import { serviceGetUser } from '~/services/users'
import { inviteAtom } from '~/atoms/invite'

type ProviderType = 'email' | 'github' | 'credentials'

interface Provider {
  id: string
  name: string
  type: string
  callbackUrl: string
  signinUrl: string
}

interface Props {
  providers: Record<ProviderType, Provider>
  inviter?: {
    project: Project
    user: User
  }
}

export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
  const providers = await getProviders() as Record<ProviderType, Provider>

  const userId = context.query.u as string
  const projectId = context.query.p as string
  if (userId && projectId) {
    const project = await serviceGetProject(parseInt(projectId))
    const user = await serviceGetUser(userId)
    if (project && user) {
      return {
        props: {
          providers,
          inviter: {
            project,
            user,
          },
        },
      }
    }
  }
  return { props: { providers } }
}

interface EmailSignInData {
  email: string
}

const EmailSignIn: FC<{
  setStep: Dispatch<SetStateAction<number>>
  onSignIn: (type: string, options: Record<string, any>) => void
}> = ({ setStep, onSignIn }) => {
  const ct = useTranslations('Common')
  const { handleSubmit, register, formState: { errors } } = useForm<EmailSignInData>()
  const onSubmit = useCallback((data: EmailSignInData) => {
    onSignIn('email', { callbackUrl: '/', email: data.email })
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="6">
        <Center
          display="flex"
          flexDirection="column"
          gap="4"
        >
          <FormControl
            isInvalid={!!errors.email}
            w="300px"
          >
            <Input
              id="email"
              placeholder="Email Address"
              type="email"
              {...register('email', {
                required: ct('thisIsRequired'),
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: ct('mustBeTheCorrectEmailAddress'),
                },
              })}
            />
            <FormErrorMessage w="full">
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            leftIcon={
              (
                <Icon
                  as={RiMailLine}
                  h="5"
                  w="5"
                />
              )
            }
            type="submit"
            variant="solid"
            w="300px"
          >
            Sign in with Email
          </Button>
        </Center>
        <Button
          onClick={() => { setStep(s => s - 1) }}
          variant="link"
        >
          ← Other Login Options
        </Button>
      </Stack>
    </form>
  )
}

const GithubSignIn: FC<Props & {
  onSignIn: (type: string, options: Record<string, any>) => void
}> = ({ providers, onSignIn }) => {
  const handleSignInGithub = useCallback(() => {
    onSignIn(providers.github.id, { callbackUrl: '/' })
  }, [providers])

  return (
    <Button
      leftIcon={
        (
          <Icon
            as={RiGithubFill}
            h="5"
            w="5"
          />
        )
      }
      onClick={handleSignInGithub}
      variant="solid"
      w="300px"
    >
      Sign in with {providers.github.name}
    </Button>
  )
}

interface AccountSignInData {
  email: string
  password: string
}
const AccountSignIn: FC<{
  onSignIn: (type: string, options: Record<string, any>) => Promise<SignInResponse | undefined>
}> = ({ onSignIn }) => {
  const ct = useTranslations('Common')
  const router = useRouter()
  const { handleSubmit, register, formState: { errors } } = useForm<AccountSignInData>()
  const toast = useToast()
  const onSubmit = useCallback(async(data: AccountSignInData) => {
    const res = await onSignIn('credentials', { redirect: false, ...data })
    if (res?.ok) {
      router.push('/')
    }
    else {
      toast({
        title: 'SignIn Error',
        description: ct('signInError'),
        status: 'error',
        isClosable: true,
      })
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="6">
        <Center
          display="flex"
          flexDirection="column"
          gap="4"
        >
          <FormControl
            isInvalid={!!errors.email}
            w="300px"
          >
            <Input
              id="email"
              placeholder="Email Address"
              type="email"
              {...register('email', {
                required: ct('thisIsRequired'),
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: ct('mustBeTheCorrectEmailAddress'),
                },
              })}
            />
            <FormErrorMessage w="full">
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!errors.password}
            w="300px"
          >
            <Input
              id="password"
              placeholder="Password"
              type="password"
              {...register('password', {
                required: ct('thisIsRequired'),
                maxLength: {
                  value: 24,
                  message: 'Max length 24',
                },
                minLength: {
                  value: 8,
                  message: 'Min length 8',
                },
              })}
            />
            <FormErrorMessage w="full">
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            leftIcon={
              (
                <Icon
                  as={RiLoginBoxLine}
                  h="5"
                  w="5"
                />
              )
            }
            type="submit"
            variant="solid"
            w="300px"
          >
            Sign in
          </Button>
        </Center>
      </Stack>
    </form>
  )
}

const SignIn: NextPageWithLayout<Props> = ({ providers, inviter }) => {
  const router = useRouter()
  useMount(async() => {
    const user = (await getSession())?.user
    if (user) {
      router.push('/')
    }
  })
  const [step, setStep] = useState(1)
  const title = useMemo(() => {
    if (inviter && inviter.project && inviter.user) {
      return (
        <Heading mb="4">
          <Avatar
            name={inviter.user.name || inviter.user.email || ''}
            size="sm"
            src={inviter.user?.image ?? ''}
          />
          {`${inviter.user.name || inviter.user.email || ''} invited you to join the ${inviter.project.name}`}
        </Heading>
      )
    }
    return <Heading mb="4">Sign in to Ohbug</Heading>
  }, [inviter])
  const [, setInviteValue] = useAtom(inviteAtom)
  useEffect(() => {
    if (inviter && inviter.project && inviter.user) {
      setInviteValue({
        projectId: inviter.project.id,
        userId: inviter.user.id,
      })
    }
  }, [router])

  return (
    <Center h="100vh">
      <Stack spacing="6">
        {title}
        <Center
          display="flex"
          flexDirection="column"
          gap="4"
        >
          {
            (providers.credentials && step === 1) && (
              <AccountSignIn
                onSignIn={signIn}
              />
            )
          }
          <Divider />
          {
            (providers.github && step === 1) && (
              <GithubSignIn
                onSignIn={signIn}
                providers={providers}
              />
            )
          }
        </Center>
        {
          providers.email && (
            <>
              {
                step === 1 && (
                  <Button
                    onClick={() => setStep(s => s + 1)}
                    variant="link"
                  >
                    Continue with Email →
                  </Button>
                )
              }
              {
                (step === 2) && (
                  <EmailSignIn
                    onSignIn={signIn}
                    setStep={setStep}
                  />
                )
              }
            </>
          )
        }
      </Stack>
    </Center>
  )
}

SignIn.getLayout = page => (
  <>
    <Head>
      <title>SignIn | Ohbug</title>
    </Head>
    {page}
  </>
)

export default SignIn
