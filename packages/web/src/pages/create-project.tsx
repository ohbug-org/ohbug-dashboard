import type { Project } from '@prisma/client'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

const projectTypes = [
  {
    label: 'JavaScript',
    value: 'javascript',
  },
]

const CreateProject: FC = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<Project>()
  const onSubmit = useCallback((data: Project) => {
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
        if (project)
          router.replace('/')
      })
  }, [])

  return (
    <div className="hero min-h-screen">
      <div className="hero-content">
        <div className="card flex-shrink-0 w-96 shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Project Name</span>
                </label>
                <input
                  className="input input-bordered"
                  placeholder="Input Project Name"
                  required
                  type="text"
                  {...register('name')}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Project Type</span>
                </label>
                <select
                  className="select select-bordered w-full max-w-xs"
                  {...register('type')}
                >
                  {
                    projectTypes.map(type => (
                      <option
                        key={type.value}
                        value={type.value}
                      >
                        {type.label}
                      </option>
                    ))
                  }
                </select>
              </div>

              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  type="submit"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProject
