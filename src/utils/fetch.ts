import type { FetchOptions, FetchResult } from '~/types/fetch'

const FETCH_DEFAULT_TIMEOUT = 5000

export function Fetch<T = any>(url: string, options: Partial<FetchOptions>): Promise<T> {
  const requestOptions: FetchOptions = {
    method: options.method || 'GET',
    headers: options.headers || {},
    data: options.data || {},
    timeout: options.timeout || FETCH_DEFAULT_TIMEOUT,
  }
  const userStore = useUserStore()
  if (userStore.token)
    requestOptions.headers.Token = userStore.token
  if (userStore.currentRole)
    requestOptions.headers['Role-ID'] = `${userStore.currentRole.id}`

  return new Promise((resolve, reject) => {
    uni.request({
      url,
      ...requestOptions,
      success(res) {
        const _data = res.data as FetchResult<T>
        if (res.statusCode >= 200 && res.statusCode <= 299)
          resolve(_data.data)
        else reject(_data)
      },
      fail(err) {
        reject(err)
      },
    })
  })
}
