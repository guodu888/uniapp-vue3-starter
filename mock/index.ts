import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/login',
    method: 'post',
    response() {
      return {
        code: 0,
        msg: '',
        data: {
          token: 'Token',
        },
      }
    },
  },
  {
    url: '/api/user/info',
    method: 'get',
    response() {
      return {
        code: 0,
        msg: '',
        data: {
          nickname: '满脑的思绪',
          avatar: 'https://s2.loli.net/2023/01/30/thNH2dbqjzETlSK.jpg',
          roles: [{
            id: 1,
            role_name: 'admin',
          }, {
            id: 2,
            role_name: 'user',
          }],
        },
      }
    },
  },
] as MockMethod[]
