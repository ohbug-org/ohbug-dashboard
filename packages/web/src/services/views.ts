import { getPrisma } from '~/db'

interface serviceGetUserViewParams {
  apiKey: string
  expirationDate?: Date
  startDate?: Date
}
export function serviceGetUserView({ apiKey, expirationDate = new Date(), startDate }: serviceGetUserViewParams) {
  const options: any = {
    where: {
      apiKey,
      createdAt: { lte: expirationDate },
    },
  }
  if (startDate) {
    options.where.createdAt.gte = startDate
  }
  return getPrisma().userView.count(options)
}

interface serviceGetPageViewParams {
  apiKey: string
  expirationDate?: Date
  startDate?: Date
}
export function serviceGetPageView({ apiKey, expirationDate = new Date(), startDate }: serviceGetPageViewParams) {
  const options: any = {
    where: {
      apiKey,
      createdAt: { lte: expirationDate },
    },
  }
  if (startDate) {
    options.where.createdAt.gte = startDate
  }
  return getPrisma().pageView.count(options)
}
