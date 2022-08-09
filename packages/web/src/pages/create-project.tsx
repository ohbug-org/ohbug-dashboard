import crypto from 'crypto'
import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Input, Select } from '@chakra-ui/react'
import type { Project } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { handle, redirect } from 'next-runtime'
import { getConfig } from 'config'
import type { NextPageWithLayout } from './_app'
import { serviceCreateProject } from '~/services/projects'
import { getAuth } from '~/libs/middleware'

type OmitProject = Omit<Project, 'id' | 'apiKey' | 'createdAt' | 'updatedAt'>

const projectTypes = [
  {
    label: 'JavaScript',
    value: 'javascript',
  },
]

const secret = getConfig().secret?.apikey ?? 'ohbug-apikey-s3cret'

export const getServerSideProps = handle({
  async get() {
    return { props: {} }
  },
  async post({ req, res }) {
    const auth = await getAuth(req, res)
    if (!auth) {
      return redirect('/auth/signin', { status: 302 })
    }
    const project = req.body as Project
    const apiKey = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(project) + new Date().getTime())
      .digest('hex')
    await serviceCreateProject({ ...project, apiKey }, auth.user)

    return redirect('/')
  },
})

const CreateProject: NextPageWithLayout = () => {
  const ct = useTranslations('Common')
  const t = useTranslations('CreateProject')
  const { handleSubmit, register, formState: { errors } } = useForm<OmitProject>()

  return (
    <Center h="100vh">
      <Box
        p="3"
        shadow="md"
        w="lg"
      >
        <form
          method="POST"
          onSubmit={handleSubmit((_, e) => e?.target.submit())}
        >
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">{t('projectName')}</FormLabel>
            <Input
              id="name"
              placeholder={t('projectNamePlaceholder')}
              type="text"
              {...register('name', { required: ct('thisIsRequired') })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={!!errors.type}
            mt="3"
          >
            <FormLabel htmlFor="type">{t('projectType')}</FormLabel>
            <Select
              id="type"
              {...register('type', { required: ct('thisIsRequired') })}
            >
              {
                projectTypes.map(({ label, value }) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {label}
                  </option>
                ))
              }
            </Select>
            <FormErrorMessage>
              {errors.type && errors.type.message}
            </FormErrorMessage>
          </FormControl>

          <Box mt="6">
            <Button
              type="submit"
              w="full"
            >
              {t('createProject')}
            </Button>
          </Box>
        </form>
      </Box>
    </Center>
  )
}

CreateProject.getLayout = page => page

export default CreateProject
