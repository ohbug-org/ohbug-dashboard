'use client'

import type { Project } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { ProjectWithMembers } from 'common'
import { useSession } from 'next-auth/react'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/use-current-project'
import { serviceGetProjectWithUsers, serviceUpdateProject } from '~/services/projects'
import { useQuery } from '~/hooks/use-query'
import { useToast } from '~/components/ui/use-toast'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog'

interface CommonProps {
  project?: ProjectWithMembers
}

const SettingsProjectName = ({ project }: CommonProps) => {
  const ct = useTranslations('Common')
  const t = useTranslations('Settings')
  const {
    register,
    watch,
    handleSubmit,
  } = useForm<Project>({ defaultValues: { name: project?.name } })
  const {toast} = useToast()
  const name = watch('name')
  const onSubmit = useCallback((value: Project) => {
    serviceUpdateProject(project!.id, value)
      .then(() => {
        toast({
          title: 'Project Updated!',
          description: 'Your project name has been updated!',
        })
      })
      .catch((error) => {
        toast({
          title: 'Project Update Failed!',
          description: error.message,
          variant: 'destructive',
        })
      })
  }, [project])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>{t('projectName')}</CardTitle>
          <CardDescription>{t('projectDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            id="name"
            placeholder={t('projectName')}
            required
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
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div />
          <Button
            disabled={!(!!name && name !== project?.name)}
            size="sm"
            type="submit"
            variant="outline"
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
        <CardTitle>{t('projectApiKey')}</CardTitle>
        <CardDescription>{t('apiKeyDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <code>{project?.apiKey ?? ''}</code>
      </CardContent>
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
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className='flex justify-between'>
            {t('projectMembers')}
            <Button
              onClick={()=>setOpen(true)}
              size="sm"
            >
              <i className="i-ri-add-line mr-2" /> {t('inviteMembers')}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {
              project?.members?.map(member => (
                <div key={member.id}>
                  <div className="flex gap-4 py-2">
                    <Avatar>
                      <AvatarImage src={member.image ?? ''} alt={member.name ?? ''} />
                      <AvatarFallback>{member.name ?? ''}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span>{member.name}</span>
                      <span>{member.email}</span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t('inviteMembers')}
            </DialogTitle>
          </DialogHeader>
          <div>
            <div className="mb-2">{t('inviteMembersDescription')}</div>
            <code>{inviteUrl}</code>
          </div>
          <DialogFooter>
            <Button onClick={()=>setOpen(false)}>Ok</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function SettingsPage() {
  const t = useTranslations('Settings')
  const { projectId } = useCurrentProject()
  const { data: project } = useQuery(
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
        <SettingsProjectName
          project={project}
        />

        <SettingsProjectApiKey
          project={project}
        />

        <SettingsProjectUsers
          project={project}
        />
      </Wrapper>
    </div>
  )
}
