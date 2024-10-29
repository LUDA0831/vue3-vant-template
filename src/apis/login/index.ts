import type { LoginModel, LoginParams } from '@/apis/login/typing'

export * from './typing'

export function login(params: LoginParams) {
  return useHttp.post<LoginModel>('/login', params)
}
export function logout() {
  return useHttp.post('/logout')
}
