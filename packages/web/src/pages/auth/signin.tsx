import type { GetServerSideProps } from 'next'
import type { ClientSafeProvider } from 'next-auth/react'
import { getProviders, signIn } from 'next-auth/react'
import type { FC } from 'react'

interface Props {
  providers: ClientSafeProvider[]
}

const Signin: FC<Props> = ({ providers }) => {
  return (
    <div className="hero">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Ohbug</h1>
          <p className="py-6">An open source application information monitoring platform.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                className="input input-bordered"
                placeholder="email"
                type="text"
              />
            </div> */}
            {providers?.map(provider => (
              <button
                className='btn'
                key={provider.name}
                onClick={() => signIn(provider.id)}
              >
                Sign in with{' '}{provider.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin

export const getServerSideProps: GetServerSideProps<Props> = async() => {
  const providers = await getProviders()

  return { props: { providers: JSON.parse(JSON.stringify(Object.values(providers ?? {}))) } }
}
