const TokenKey = 'Admin-Token'
const UserRoleKey = 'User-Role-Key'

// Token
export function getToken() {
  return uni.getStorageSync(TokenKey)
}

export function setToken(token: string) {
  return uni.setStorageSync(TokenKey, token)
}

export function removeToken() {
  return uni.removeStorageSync(TokenKey)
}

// UserRoleId
export function getUserRoleId() {
  return uni.getStorageSync(UserRoleKey)
}

export function setUserRoleId(token: string) {
  return uni.setStorageSync(UserRoleKey, token)
}

export function removeUserRoleId() {
  return uni.removeStorageSync(UserRoleKey)
}
