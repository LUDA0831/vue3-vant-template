import type { UserInfoModel } from '@/apis/user/typing.ts'

export * from './typing'

export function getUserInfo() {
  return useHttp.get<UserInfoModel>('/user/info')
}
