import { Box, Button, Flex, FormControl, FormErrorMessage, Input, Skeleton, Text, useToast } from '@chakra-ui/react'
import type { Project } from '@prisma/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import useSWR, { mutate } from 'swr'
import Card from '~/components/card'
import ThemeBox from '~/components/themeBox'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'

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
                (!!name && name !== project.name) && (
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
                      fontWeight="bold"
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
              <div>leftr</div>
              <Button
                disabled={!(!!name && name !== project.name)}
                size="xs"
                type="submit"
                variant="solid"
              >
                Save
              </Button>
            </Flex>
          )
        }
        hover={false}
        title="ProjectName"
      />
    </form>
  )
}

const Settings: NextPage = () => {
  const router = useRouter()
  const projectId = parseInt(router.query.id as string)
  const { data: project } = useSWR<Project>(`/api/projects/${projectId}`)
  const loading = useMemo(() => !project, [project])

  return (
    <Box>
      <Title>Project Settings</Title>

      <Wrapper py="12">
        <Skeleton isLoaded={!loading}>
          <SettingsProjectName project={project} />
        </Skeleton>
      </Wrapper>
    </Box>
  )
}

export default Settings
