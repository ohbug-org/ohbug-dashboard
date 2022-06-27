import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Input, Select } from '@chakra-ui/react'
import type { Project } from '@prisma/client'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'

type OmitProject = Omit<Project, 'id' | 'apiKey' | 'createdAt' | 'updatedAt'>

const projectTypes = [
  {
    label: 'JavaScript',
    value: 'javascript',
  },
]

const CreateProject = () => {
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
            <FormLabel htmlFor="name">Project Name</FormLabel>
            <Input
              id="name"
              placeholder="Input Project Name"
              required
              type="text"
              {...register('name', { required: 'This is required' })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.type}>
            <FormLabel htmlFor="type">Project Type</FormLabel>
            <Select
              id="type"
              required
              {...register('type', { required: 'This is required' })}
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
              Create Project
            </Button>
          </Box>
        </form>
      </Box>
    </Center>
  )
}

CreateProject.getLayout = function getLayout(page: ReactElement) {
  return page
}

export default CreateProject
