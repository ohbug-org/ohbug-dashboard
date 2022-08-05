import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Input, Select } from '@chakra-ui/react'
import type { Project } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import type { NextPageWithLayout } from './_app'

type OmitProject = Omit<Project, 'id' | 'apiKey' | 'createdAt' | 'updatedAt'>

const projectTypes = [
  {
    label: 'JavaScript',
    value: 'javascript',
  },
]

const CreateProject: NextPageWithLayout = () => {
  const ct = useTranslations('Common')
  const t = useTranslations('CreateProject')
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const { handleSubmit, register, formState: { errors } } = useForm<OmitProject>()
  const onSubmit = useCallback((data: OmitProject) => {
    fetch(
      '/api/projects',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      },
    )
      .then(res => res.json())
      .then((project) => {
        if (project) router.replace('/')
        mutate('/api/projects')
      })
  }, [])

  return (
    <Center h="100vh">
      <Box
        p="3"
        shadow="md"
        w="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
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
