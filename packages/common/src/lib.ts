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
  const { page, pageSize } = value
  const skip = page * (pageSize ?? defaultPageSize)
  const take = pageSize ?? defaultPageSize
  return {
    skip,
    take,
  }
}
