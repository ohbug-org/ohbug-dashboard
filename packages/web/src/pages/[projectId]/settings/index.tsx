import { Box, Button, Flex, FormControl, FormErrorMessage, Input, Skeleton, Text, useToast } from '@chakra-ui/react'
import type { Project } from '@prisma/client'
import type { NextPage } from 'next'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import useSWR, { mutate } from 'swr'
import Card from '~/components/card'
import Copy from '~/components/copy'
import ThemeBox from '~/components/themeBox'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/useCurrentProject'

interface Form {
  name: string
}
const SettingsProjectName: FC<{ project?: Project }> = ({ project }) => {
  const ct = useTranslations('Common')
  const t = useTranslations('Settings')
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<Form>({ defaultValues: { name: project?.name } })
  const toast = useToast()
  const onSubmit = useCallback((data: Form) => {
    fetch(
      `/api/projects/${project?.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      },
    )
      .then(res => res.json())
      .then(() => mutate('/api/projects'))
      .then(() => mutate(`/api/projects/${project?.id}`))
      .then(() => {
        toast({
          title: 'Project Updated!',
          description: 'Your project name has been updated!',
          status: 'success',
        })
      })
  }, [])
  const name = watch('name')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card
        content={
          (
            <Box>
              <Text mb="2">{t('projectDescription')}</Text>

              <FormControl isInvalid={!!errors.name}>
                <Input
                  id="name"
                  placeholder={t('projectName')}
                  required
                  type="text"
                  variant="filled"
                  {...register('name', { required: ct('thisIsRequired') })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              {
                (!!name && name !== project?.name) && (
                  <ThemeBox
                    border="1px"
                    borderColor="current"
                    mt="2"
                    p="2"
                    rounded="sm"
                  >
                    {t('yourProjectWillBeRenamedTo')} `
                    <Box
                      as="span"
                      fontWeight="semibold"
                    >
                      {name}
                    </Box>
                    `.
                  </ThemeBox>
                )
              }
            </Box>
          )
        }
        footer={
          (
            <Flex
              align="center"
              justify="space-between"
            >
              <div />
              <Button
                disabled={!(!!name && name !== project?.name)}
                size="sm"
                type="submit"
                variant="solid"
              >
                {t('save')}
              </Button>
            </Flex>
          )
        }
        title={t('projectName')}
      />
    </form>
  )
}

const SettingsProjectApiKey: FC<{ project?: Project }> = ({ project }) => {
  const t = useTranslations('Settings')
  return (
    <Card
      content={
        (
          <Box>
            <Text mb="2">{t('apiKeyDescription')}</Text>

            <Copy>{project?.apiKey ?? ''}</Copy>
          </Box>
        )
      }
      title={t('projectApiKey')}
    />
  )
}

const Settings: NextPage = () => {
  const t = useTranslations('Settings')
  const { projectId } = useCurrentProject()
  const { data: project } = useSWR<Project>(`/api/projects/${projectId}`)
  const loading = useMemo(() => !project, [project])

  return (
    <Box>
      <Title>{t('projectSettings')}</Title>

      <Wrapper
        display="flex"
        flexDirection="column"
        gap="12"
        py="12"
      >
        <Skeleton isLoaded={!loading}>
          <SettingsProjectName project={project} />
        </Skeleton>

        <Skeleton isLoaded={!loading}>
          <SettingsProjectApiKey project={project} />
        </Skeleton>
      </Wrapper>
    </Box>
  )
}

export default Settings
