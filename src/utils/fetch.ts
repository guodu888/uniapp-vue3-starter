import type { FetchOptions, FetchResult } from '~/types/fetch'

const FETCH_DEFAULT_TIMEOUT = 5000

export function Fetch<T = any>(url: string, options: Partial<FetchOptions>): Promise<T> {
  const requestOptions: FetchOptions = {
    method: options.method || 'GET',
    header: options.header || {},
    data: options.data || {},
    timeout: options.timeout || FETCH_DEFAULT_TIMEOUT,
  }
  const userStore = useUserStore()
  if (userStore.token)
    requestOptions.header.Token = userStore.token
  if (userStore.currentRole)
    requestOptions.header['Role-ID'] = `${userStore.currentRole.id}`

  return new Promise((resolve, reject) => {
    uni.request({
      url,
      ...requestOptions,
      success(res) {
        const _data = res.data as FetchResult<T>
        if (res.statusCode >= 200 && res.statusCode <= 299) {
          const data = _data.data
          if (_data.code === 0) { resolve(data) }
          else {
            if (options.showErrToast !== false)
              uni.showToast({ title: _data.msg, icon: 'none' })
            reject(_data)
          }
        }
        else {
          if (options.showErrToast !== false)
            uni.showToast({ title: _data.msg, icon: 'none' })
          reject(_data)
        }
      },
      fail(err) {
        reject(err)
        if (options.showErrToast !== false)
          uni.showToast({ title: err.errMsg, icon: 'none' })
      },
    })
  })
}
