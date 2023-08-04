const BASE_URL = '/api'

const path = {
  login: '/login',
  getUserInfo: '/user/info',
  getUserList: '/user/list',
} as const

type ApiKeys = keyof typeof path

type ApiPath = typeof path

const getApi = () => {
  const Api = {} as ApiPath
  Object.keys(path).forEach((item) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    Api[item] = `${BASE_URL}${path[item as ApiKeys]}`
  })
  return Api
}

export const api = getApi()
