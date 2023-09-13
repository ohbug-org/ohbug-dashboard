'use client'

import { getSession, signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next-intl/client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAtom } from 'jotai'
import { useMount } from 'react-use'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { type SignInResponse } from 'next-auth/react'
import { type Project, type User } from '@prisma/client'
import { type Dispatch, type SetStateAction } from 'react'
import { inviteAtom } from '~/atoms/invite'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { useToast } from '~/components/ui/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'

type ProviderType = 'email' | 'github' | 'credentials'

interface Provider {
  id: string
  name: string
  type: string
  callbackUrl: string
  signinUrl: string
}

interface Props {
  providers: Record<ProviderType, Provider>
  inviter?: {
    project: Project
    user: User
  }
}

interface EmailSignInData {
  email: string
}
interface EmailSignInProps {
  setStep: Dispatch<SetStateAction<number>>
  onSignIn: (type: string, options: Record<string, any>) => void
}
function EmailSignIn({ setStep, onSignIn }: EmailSignInProps) {
  const ct = useTranslations('Common')
  const formSchema = z.object({ email: z.string().email().min(2, { message: ct('mustBeTheCorrectEmailAddress') }) })
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) })
  const onSubmit = useCallback((data: EmailSignInData) => {
    onSignIn('email', { callbackUrl: '/', email: data.email })
  }, [])

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email Address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="submit"
        >
          <i className="i-ri-mail-line mr-2" /> Sign in with Email
        </Button>
        <Button
          variant="link"
          onClick={() => { setStep(s => s - 1) }}
        >
          ← Other Login Options
        </Button>
      </form>
    </Form>
  )
}

type GithubSignInProps = Props & {
  onSignIn: (type: string, options: Record<string, any>) => void
}
function GithubSignIn({ providers, onSignIn }: GithubSignInProps) {
  const handleSignInGithub = useCallback(() => {
    onSignIn(providers.github.id, { callbackUrl: '/' })
  }, [providers])

  return (
    <Button
      variant="outline"
      onClick={handleSignInGithub}
    >
      <i className="i-ri-github-fill mr-2" /> {providers.github.name}
    </Button>
  )
}

interface AccountSignInData {
  email: string
  password: string
}
interface AccountSignInProps {
  onSignIn: (type: string, options: Record<string, any>) => Promise<SignInResponse | undefined>
}
function AccountSignIn({ onSignIn }: AccountSignInProps) {
  const ct = useTranslations('Common')
  const router = useRouter()
  const formSchema = z.object({
    email: z.string().email().min(2, { message: ct('mustBeTheCorrectEmailAddress') }),
    password: z.string().max(24).min(8),
  })
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) })
  const { toast } = useToast()
  const onSubmit = useCallback(async (data: AccountSignInData) => {
    const res = await onSignIn('credentials', { redirect: false, ...data })
    if (res?.ok) {
      router.push('/')
    }
    else {
      toast({
        title: 'SignIn Error',
        description: ct('signInError'),
        variant: 'destructive',
      })
    }
  }, [])

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email Address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="submit"
        >
          <i className="i-ri-login-box-line mr-2" /> Sign in
        </Button>
      </form>
    </Form>
  )
}

export default function SignIn({ providers, inviter }: Props) {
  const router = useRouter()
  useMount(async () => {
    const user = (await getSession())?.user
    if (user) {
      router.push('/')
    }
  })
  const [step, setStep] = useState(1)
  const title = useMemo(() => {
    if (inviter && inviter.project && inviter.user) {
      const name = inviter.user.name || inviter.user.email || ''
      return (
        <h2 className="font-bold text-3xl">
          <Avatar>
            <AvatarImage
              alt={name}
              src={inviter.user?.image ?? ''}
            />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          {`${inviter.user.name || inviter.user.email || ''} invited you to join the ${inviter.project.name}`}
        </h2>
      )
    }
    return <h2 className="font-bold text-3xl">Sign in to Ohbug</h2>
  }, [inviter])
  const [, setInviteValue] = useAtom(inviteAtom)
  useEffect(() => {
    if (inviter && inviter.project && inviter.user) {
      setInviteValue({
        projectId: inviter.project.id,
        userId: inviter.user.id,
      })
    }
  }, [router])

  return (
    <section className="h-screen flex items-center justify-center">
      <Card className="w-[450px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>
            Choose a way to log in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {
            step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-6">
                  {
                    (providers.github)
                      ? (
                        <GithubSignIn
                          providers={providers}
                          onSignIn={signIn}
                        />
                        )
                      : null
                  }
                  {
                    (providers.email)
                      ? (
                        <Button
                          variant="outline"
                          onClick={() => setStep(s => s + 1)}
                        >
                          <i className="i-ri-mail-line mr-2" /> Email
                        </Button>
                        )
                      : null
                  }
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
              </>
            )
          }
          {
          step === 1 && (
            <>
              {
                (providers.credentials)
                  ? (
                    <AccountSignIn
                      onSignIn={signIn}
                    />
                    )
                  : null
              }
            </>
          )
        }
          {
          providers.email
            ? (
              <>
                {
                (step === 2) && (
                  <EmailSignIn
                    setStep={setStep}
                    onSignIn={signIn}
                  />
                )
              }
              </>
              )
            : null
        }
        </CardContent>
      </Card>
    </section>
  )
}
