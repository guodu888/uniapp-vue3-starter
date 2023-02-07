export interface RoleItem {
  id: number
  role_name: string
}

export interface UserInfo {
  nickname: string
  avatar: string
  roles: RoleItem[]
}
