import type { LoginParams } from '@/apis/login'
import type { UserInfoModel } from '@/apis/user'
import { defineStore } from 'pinia'

function storeSetup() {
  const token = ref('')
  const getToken = computed(() => token.value)
  const isLogin = computed(() => !!token.value)

  const userInfo = ref<UserInfoModel>()
  const getUserInfo = computed(() => userInfo.value)

  const clearUserInfo = () => {
    token.value = ''
    userInfo.value = undefined
  }
  const login = async (params: LoginParams) => {
    const { login } = useApi()
    const { data } = await login.login(params)
    token.value = data.token
    return data.token
  }
  const logout = async () => {
    const { login } = useApi()
    await login.logout()
    clearUserInfo()
  }
  return {
    login,
    logout,
    clearUserInfo,
    getToken,
    isLogin,
    userInfo,
    getUserInfo,
  }
}
export const useUserStore = defineStore('app-user', storeSetup, { persist: true })
