import type { Setting } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

const Bootstrap = () => {
  const router = useRouter()
  const session = useSession()
  const { register, handleSubmit } = useForm<Setting>()
  const onSubmit = useCallback((data: Setting) => {
    fetch(
      '/api/setting',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      },
    )
      .then(res => res.json())
      .then((setting) => {
        if (setting && !session.data)
          router.replace('/api/auth/signin')
        else
          router.replace('/')
      })
  }, [session])

  return (
    <div className="hero min-h-screen">
      <div className="hero-content">
        <div className="card flex-shrink-0 w-96 shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Github OAuth Client ID</span>
                </label>
                <input
                  className="input input-bordered"
                  placeholder="Client ID"
                  required
                  type="text"
                  {...register('githubClientId')}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Github OAuth Client Secret</span>
                </label>
                <input
                  className="input input-bordered"
                  placeholder="Client Secret"
                  required
                  type="text"
                  {...register('githubClientSecret')}
                />
                <label className="label">
                  <a
                    className="label-text-alt link link-hover"
                    href="https://docs.github.com/developers/apps/building-oauth-apps/creating-an-oauth-app"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Get Client ID/Secret?
                  </a>
                </label>
              </div>

              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  type="submit"
                >
                  Bootstrap
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

Bootstrap.getLayout = function getLayout(page: ReactElement) {
  return page
}

export default Bootstrap
