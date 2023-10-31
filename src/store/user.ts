import { api } from '~/config/api'
import type { RoleItem, UserInfo } from '~/types/user'
import { Fetch } from '~/utils/fetch'
import { getToken, getUserRoleId, removeToken, removeUserRoleId, setToken, setUserRoleId } from '~/utils/auth'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(getToken())
  const userInfo = ref<UserInfo | null>(null)
  const currentRole = ref<RoleItem | null>(null)
  function login(account: string, pwd: string) {
    return new Promise((resolve) => {
      Fetch<{ token: string }>(api.login, { data: { account, pwd }, method: 'POST', showErrToast: true }).then((resData) => {
        token.value = resData.token
        // 获取用户信息
        setToken(resData.token)
        getUserInfo()
        resolve({})
      })
    })
  }
  function logout() {
    return new Promise((resolve) => {
      token.value = ''
      userInfo.value = null
      currentRole.value = null
      removeToken()
      removeUserRoleId()
      resolve({})
    })
  }
  function getUserInfo() {
    return new Promise((resolve) => {
      Fetch<UserInfo>(api.getUserInfo, {}).then((resData) => {
        userInfo.value = resData
        const currentUserRoleId: number = Number.parseInt(getUserRoleId() ?? '0')
        const r = resData.roles.find(x => x.id === currentUserRoleId)
        setRole(r || (resData.roles?.[0] ?? null))
        resolve({})
      })
    })
  }
  function setRole(role: RoleItem | null) {
    currentRole.value = role
    if (role)
      setUserRoleId(`${role.id}`)
  }
  return {
    token,
    userInfo,
    currentRole,
    login,
    logout,
    setRole,
    getUserInfo,
  }
})
