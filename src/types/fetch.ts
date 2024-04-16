export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
export interface FetchOptions {
  method: FetchMethod
  header: Record<string, string>
  data: Record<string, string | number>
  timeout: number
  showErrToast?: boolean
  retryTimeout?: number
}

export interface FetchResult<T> {
  data: T
  code: number
  msg: string
}
