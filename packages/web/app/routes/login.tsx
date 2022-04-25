import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react'
import * as React from 'react'

import { createUserSession, getUserId } from '~/session.server'
import { verifyLogin } from '~/models/user.server'
import { safeRedirect, validateEmail } from '~/utils'

export const loader: LoaderFunction = async({ request }) => {
  const userId = await getUserId(request)
  if (userId) return redirect('/')
  return json({})
}

interface ActionData {
  errors?: {
    email?: string
    password?: string
  }
}

export const action: ActionFunction = async({ request }) => {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  const redirectTo = safeRedirect(formData.get('redirectTo'), '/')
  const remember = formData.get('remember')

  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: 'Email is invalid' } },
      { status: 400 },
    )
  }

  if (typeof password !== 'string') {
    return json<ActionData>(
      { errors: { password: 'Password is required' } },
      { status: 400 },
    )
  }

  if (password.length < 8) {
    return json<ActionData>(
      { errors: { password: 'Password is too short' } },
      { status: 400 },
    )
  }

  const user = await verifyLogin(email, password)

  if (!user) {
    return json<ActionData>(
      { errors: { email: 'Invalid email or password' } },
      { status: 400 },
    )
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === 'on',
    redirectTo,
  })
}

export const meta: MetaFunction = () => {
  return { title: 'Login' }
}

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/notes'
  const actionData = useActionData() as ActionData
  const emailRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (actionData?.errors?.email)
      emailRef.current?.focus()
    else if (actionData?.errors?.password)
      passwordRef.current?.focus()
  }, [actionData])

  return (
    <div className="flex flex-col min-h-full justify-center">
      <div className="mx-auto max-w-md w-full px-8">
        <Form
          className="space-y-6"
          method="post"
          noValidate
        >
          <div>
            <label
              className="font-medium text-sm text-gray-700 block"
              htmlFor="email"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                aria-describedby="email-error"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                autoComplete="email"
                autoFocus={true}
                className="border rounded border-gray-500 text-lg w-full py-1 px-2"
                id="email"
                name="email"
                ref={emailRef}
                required
                type="email"
              />
              {actionData?.errors?.email && (
                <div
                  className="pt-1 text-red-700"
                  id="email-error"
                >
                  {actionData.errors.email}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              className="font-medium text-sm text-gray-700 block"
              htmlFor="password"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                aria-describedby="password-error"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                autoComplete="current-password"
                className="border rounded border-gray-500 text-lg w-full py-1 px-2"
                id="password"
                name="password"
                ref={passwordRef}
                type="password"
              />
              {actionData?.errors?.password && (
                <div
                  className="pt-1 text-red-700"
                  id="password-error"
                >
                  {actionData.errors.password}
                </div>
              )}
            </div>
          </div>

          <input
            name="redirectTo"
            type="hidden"
            value={redirectTo}
          />
          <button
            className="rounded bg-blue-500 text-white  w-full py-2 px-4 hover:bg-blue-600 focus:bg-blue-400"
            type="submit"
          >
            Log in
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                className="rounded border-gray-300 h-4 text-blue-600 w-4 focus:ring-blue-500"
                id="remember"
                name="remember"
                type="checkbox"
              />
              <label
                className="text-sm ml-2 text-gray-900 block"
                htmlFor="remember"
              >
                Remember me
              </label>
            </div>
            <div className="text-center text-sm text-gray-500">
              <Link
                className="text-blue-500 underline"
                to={{
                  pathname: '/join',
                  search: searchParams.toString(),
                }}
              >
                Sign up
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
