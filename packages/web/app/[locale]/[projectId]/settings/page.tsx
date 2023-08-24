'use client'

import type { Project } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import type { ProjectWithMembers } from 'common'
import { useSession } from 'next-auth/react'
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Skeleton, Snippet, useDisclosure } from '@nextui-org/react'
import { useToast } from '@chakra-ui/react'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/use-current-project'
import { serviceGetProjectWithUsers, serviceUpdateProject } from '~/services/projects'
import { useQuery } from '~/hooks/use-query'

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
      <Card>
        <CardHeader>
          {t('projectName')}
        </CardHeader>
        <CardBody>
          <div className="mb-2">{t('projectDescription')}</div>

          <Input
            errorMessage={errors.name && errors.name.message}
            id="name"
            placeholder={t('projectName')}
            required
            type="text"
            validationState={errors.name ? 'invalid' : 'valid'}
            {...register('name', { required: ct('thisIsRequired') })}
          />

          {
            (!!name && name !== project?.name) && (
              <div className="mt-2 p-2 rounded">
                {t('yourProjectWillBeRenamedTo')} `
                <span className="font-semibold">
                  {name}
                </span>
                    `.
              </div>
            )
          }
        </CardBody>
        <CardFooter className="flex items-center justify-between">
          <div />
          <Button
            disabled={!(!!name && name !== project?.name)}
            size="sm"
            type="submit"
            variant="solid"
          >
            {t('save')}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

const SettingsProjectApiKey = ({ project }: CommonProps) => {
  const t = useTranslations('Settings')

  return (
    <Card>
      <CardHeader>
        {t('projectApiKey')}
      </CardHeader>
      <CardBody>
        <div className="mb-2">{t('apiKeyDescription')}</div>
        <Snippet>{project?.apiKey ?? ''}</Snippet>
      </CardBody>
    </Card>
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
      <Card>
        <CardHeader className="flex items-center justify-between">
          {t('projectMembers')}
          <Button
            onClick={onOpen}
            size="sm"
            startContent={<i className="i-ri-add-line" />}
          >
            {t('inviteMembers')}
          </Button>
        </CardHeader>
        <CardBody>
          <div>
            {
              project?.members?.map(member => (
                <div key={member.id}>
                  <div className="flex gap-4 py-2">
                    <Avatar
                      name={member.name ?? ''}
                      size="sm"
                      src={member.image ?? ''}
                    />
                    <div className="flex flex-col">
                      <span>{member.name}</span>
                      <span>{member.email}</span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader>{t('inviteMembers')}</ModalHeader>
          <ModalBody>
            <div className="mb-2">{t('inviteMembersDescription')}</div>
            <Snippet>{inviteUrl}</Snippet>
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
    <div>
      <Title>{t('projectSettings')}</Title>

      <Wrapper className="flex flex-col gap-12 py-12">
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
    </div>
  )
}
