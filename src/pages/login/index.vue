<script setup lang="ts">
import type { LoginParams } from '@/apis/login'

definePage({ meta: { title: '登录' } })

const router = useRouter()
const userStore = useUserStore()
const rules = reactive({
  mobile: [
    { required: true, message: '请输入手机号' },
  ],
  password: [
    { required: true, message: '请输入密码' },
  ],
})
const formData = ref<LoginParams>({
  mobile: 13000000000,
  password: 'admin',
})
const loading = ref(false)
async function handleLogin() {
  loading.value = true
  await userStore.login({ ...formData.value }).finally(() => loading.value = false)
  await router.replace({ path: '/' })
}
</script>

<template>
  <AppPage show-back p-8>
    <van-form :model="formData" :rules="rules" validate-trigger="onSubmit" @submit="handleLogin">
      <van-field
        v-model="formData.mobile"
        :rules="rules.mobile"
        name="mobile"
        placeholder="13000000000"
      />
      <van-field
        v-model="formData.password"
        type="password"
        :rules="rules.password"
        name="password"
        placeholder="admin"
      />
      <div class="mt-16">
        <van-button
          :loading="loading"
          type="primary"
          native-type="submit"
          round block
        >
          登录
        </van-button>
      </div>
    </van-form>
  </AppPage>
</template>

<style scoped>

</style>
