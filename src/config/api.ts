let BASE_URL = '/api'

// #ifdef MP-WEIXIN
BASE_URL = 'http://192.168.7.24:8081/api'
// #endif

const path = {
  login: '/login',
  getUserInfo: '/user/info',
  getUserList: '/user/list',
} as const

type ApiKeys = keyof typeof path

type ApiPath = {
  [key in ApiKeys]: string
}

function getApi() {
  const Api = {} as ApiPath
  Object.keys(path).forEach((item) => {
    const key = item as ApiKeys
    Api[key] = `${BASE_URL}${path[key]}`
  })
  return Api
}

export const api = getApi()
