import { Box, Button, Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import type { Setting } from '@prisma/client'
import type { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { serviceGetSetting } from '~/services/bootstrap'

type OmitSetting = Omit<Setting, 'id'>

interface Props {
  setting: Setting | null
}

export const getServerSideProps: GetServerSideProps<Props> = async() => {
  const setting = await serviceGetSetting()
  return { props: { setting } }
}

const Bootstrap = ({ setting }: Props) => {
  const router = useRouter()
  const session = useSession()
  const { handleSubmit, register, formState: { errors } } = useForm<OmitSetting>({ defaultValues: setting || {} })
  const onSubmit = useCallback((data: OmitSetting) => {
    fetch(
      '/api/settings',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      },
    )
      .then(res => res.json())
      .then((setting) => {
        if (setting && !session.data) {
          router.replace('/api/auth/signin')
        }
        else {
          router.replace('/')
        }
      })
  }, [session])

  return (
    <Center h="100vh">
      <Box
        p="3"
        shadow="md"
        w="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.githubClientId}>
            <FormLabel htmlFor="githubClientId">Github OAuth Client ID</FormLabel>
            <Input
              id="githubClientId"
              placeholder="Client ID"
              type="text"
              {...register('githubClientId', { required: 'This is required' })}
            />
            <FormErrorMessage>
              {errors.githubClientId && errors.githubClientId.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.githubClientSecret}>
            <FormLabel htmlFor="githubClientSecret">Github OAuth Client Secret</FormLabel>
            <Input
              id="githubClientSecret"
              placeholder="Client Secret"
              type="text"
              {...register('githubClientSecret', { required: 'This is required' })}
            />
            <FormHelperText>
              <a
                href="https://docs.github.com/developers/apps/building-oauth-apps/creating-an-oauth-app"
                rel="noreferrer"
                target="_blank"
              >
                Get Client ID/Secret?
              </a>
            </FormHelperText>
            <FormErrorMessage>
              {errors.githubClientSecret && errors.githubClientSecret.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.emailServer}>
            <FormLabel htmlFor="emailServer">Email Server</FormLabel>
            <Input
              id="emailServer"
              placeholder="Email Server"
              type="text"
              {...register('emailServer')}
            />
            <FormErrorMessage>
              {errors.emailServer && errors.emailServer.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.emailFrom}>
            <FormLabel htmlFor="emailFrom">Email From</FormLabel>
            <Input
              id="emailFrom"
              placeholder="Email From"
              type="text"
              {...register('emailFrom')}
            />
            <FormErrorMessage>
              {errors.emailFrom && errors.emailFrom.message}
            </FormErrorMessage>
          </FormControl>

          <Box mt="6">
            <Button
              type="submit"
              w="full"
            >
              Bootstrap
            </Button>
          </Box>
        </form>
      </Box>
    </Center>
  )
}

Bootstrap.getLayout = function getLayout(page: ReactElement) {
  return page
}

export default Bootstrap
