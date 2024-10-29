export interface BasicPageParams {
  page?: number
  pageSize?: number
}

export interface BasicFetchResult<T> {
  items: T[]
  pageInfo: {
    currentPage: number
    total: number
    totalPage: number
  }
}
