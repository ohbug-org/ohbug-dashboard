'use client'

import { Avatar, Box, Button, Flex, FormControl, FormErrorMessage, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Text, useDisclosure, useToast } from '@chakra-ui/react'
import type { Project } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import type { ProjectWithMembers } from 'common'
import { RiAddLine } from 'react-icons/ri'
import { useSession } from 'next-auth/react'
import Card from '~/components/card'
import Copy from '~/components/copy'
import ThemeBox from '~/components/themeBox'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/useCurrentProject'
import { serviceGetProjectWithUsers, serviceUpdateProject } from '~/services/projects'
import { useQuery } from '~/hooks/useQuery'

interface CommonProps {
  project?: ProjectWithMembers
}

const SettingsProjectName = ({ project }: CommonProps) => {
  const ct = useTranslations('Common')
  const t = useTranslations('Settings')
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<Project>({ defaultValues: { name: project?.name } })
  const toast = useToast()
  const name = watch('name')
  const onSubmit = useCallback((value: Project) => {
    serviceUpdateProject(project!.id, value)
      .then(() => {
        toast({
          title: 'Project Updated!',
          description: 'Your project name has been updated!',
          status: 'success',
        })
      })
      .catch((error) => {
        toast({
          title: 'Project Update Failed!',
          description: error.message,
          status: 'error',
        })
      })
  }, [project])

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

const SettingsProjectApiKey = ({ project }: CommonProps) => {
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

const SettingsProjectUsers = ({ project }: CommonProps) => {
  const { data } = useSession()
  const inviteUrl = useMemo(() => {
    // @ts-expect-error next-auth types are wrong
    const userId = data?.user?.id
    const projectId = project?.id
    return `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/signin?p=${projectId}&u=${userId}`
  }, [data, project])

  const t = useTranslations('Settings')
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Card
        content={
          (
            <Box>
              {
                project?.members?.map(member => (
                  <Box key={member.id}>
                    <Flex
                      gap="4"
                      py="2"
                    >
                      <Avatar
                        name={member.name ?? ''}
                        size="sm"
                        src={member.image ?? ''}
                      />
                      <Flex direction="column">
                        <Box>{member.name}</Box>
                        <Box>{member.email}</Box>
                      </Flex>
                    </Flex>
                    <Box />
                    <Box />
                  </Box>
                ))
              }
            </Box>
          )
        }
        extra={
          (
            <Button
              leftIcon={<RiAddLine />}
              onClick={onOpen}
            >
              {t('inviteMembers')}
            </Button>
          )
        }
        title={t('projectMembers')}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('inviteMembers')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb="2">{t('inviteMembersDescription')}</Text>
            <Copy>{inviteUrl}</Copy>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Ok</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default function SettingsPage() {
  const t = useTranslations('Settings')
  const { projectId } = useCurrentProject()
  const { data: project, isLoading } = useQuery(
    () => serviceGetProjectWithUsers(projectId!),
    {
      enabled: !!projectId,
      deps: [projectId],
    },
  )

  return (
    <Box>
      <Title>{t('projectSettings')}</Title>

      <Wrapper
        display="flex"
        flexDirection="column"
        gap="12"
        py="12"
      >
        <Skeleton isLoaded={!isLoading}>
          <SettingsProjectName
            project={project}
          />
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
          <SettingsProjectApiKey
            project={project}
          />
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
          <SettingsProjectUsers
            project={project}
          />
        </Skeleton>
      </Wrapper>
    </Box>
  )
}
