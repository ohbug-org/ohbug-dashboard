import { Box, Button, Flex, FormControl, FormErrorMessage, Input, Skeleton, Text, useToast } from '@chakra-ui/react'
import type { Project } from '@prisma/client'
import type { NextPage } from 'next'
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

const SettingsProjectName: FC<{ project?: Project }> = ({ project }) => {
  interface Form {
    name: string
  }
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
              <Text mb="2">Used to identify your Project on the Dashboard.</Text>

              <FormControl isInvalid={!!errors.name}>
                <Input
                  id="name"
                  placeholder="project name"
                  required
                  type="text"
                  variant="filled"
                  {...register('name', { required: 'This is required' })}
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
                    Your Project will be renamed to `
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
                Save
              </Button>
            </Flex>
          )
        }
        title="Project Name"
      />
    </form>
  )
}

const SettingsProjectApiKey: FC<{ project?: Project }> = ({ project }) => {
  return (
    <Card
      content={
        (
          <Box>
            <Text mb="2">To send data to Ohbug you will need to configure an SDK with a apiKey.</Text>

            <Copy>{project?.apiKey ?? ''}</Copy>
          </Box>
        )
      }
      title="Project ApiKey"
    />
  )
}

const Settings: NextPage = () => {
  const { projectId } = useCurrentProject()
  const { data: project } = useSWR<Project>(`/api/projects/${projectId}`)
  const loading = useMemo(() => !project, [project])

  return (
    <Box>
      <Title>Project Settings</Title>

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
