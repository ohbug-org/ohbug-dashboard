import { md5 } from 'common'
import { getPrisma } from '~/db'

interface ServiceCreateUserParams {
  email: string
  password: string
}
export async function serviceCreateUser({ email, password }: ServiceCreateUserParams) {
  return getPrisma().user.create({
    data: {
      email,
      name: email,
      password: md5(md5(password)),
    },
  })
}

interface ServiceCreateUserParams {
  email: string
  password: string
}
export async function serviceLogin({ email, password }: ServiceCreateUserParams) {
  const pass = md5(md5(password))
  const user = await getPrisma().user.findUnique({ where: { email } })
  if (user) {
    if (user.password) {
      if (user.password === pass) return user
    }
    throw new Error('Login failed email or password error')
  }
  return serviceCreateUser({ email, password })
}

export async function serviceGetUser(id: string) {
  return getPrisma().user.findUniqueOrThrow({ where: { id } })
}

interface ServiceBindProjectMembersParams {
  projectId: number
  userId: string
}
export function serviceBindProjectMembers({ projectId, userId }: ServiceBindProjectMembersParams) {
  return getPrisma().project.update({
    where: { id: projectId },
    data: {
      users: {
        create: {
          assignedAt: new Date(),
          user: { connect: { id: userId } },
        },
      },
    },
  })
}
