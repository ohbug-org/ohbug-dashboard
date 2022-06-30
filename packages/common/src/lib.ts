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
