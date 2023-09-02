import crypto from 'crypto-js/md5'

export const PAGE_SIZE = 10

export interface Pagination {
  page: number
  pageSize?: number
  perPage?: number
}

interface PrismaPagination {
  skip: number
  take: number
}
export function pagination(value: Pagination, defaultPageSize = 10): PrismaPagination {
  const { page = 1, pageSize } = value
  const skip = (page - 1) * (pageSize ?? defaultPageSize)
  const take = pageSize ?? defaultPageSize
  return {
    skip,
    take,
  }
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}

export function md5(data: string) {
  return crypto(data).toString()
}
