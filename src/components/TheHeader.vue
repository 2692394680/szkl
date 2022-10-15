<script setup lang="ts">
import { getUserStore } from '@/store/modules/user_store'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const {
  token,
  userinfo
} = storeToRefs(getUserStore())

onMounted(() => {
  if (token.value !== 'main_token') {
    getUserStore().isLogin()
    getUserStore().getUserInfo()
  }
})
</script>
<script lang="ts">
export default {
  name: 'TheHeader'
}
</script>

<template>
  <div class="header-box">
    <t-head-menu theme="dark" height="120px">
      <p class="text-3xl text-white cursor-pointer mr-4" @click="$router.push('/')">SZKelian</p>
      <slot v-if="$route.name==='Design'"></slot>

      <template #operations>
        <div v-if="token==='main_token'">
          <t-button class="mr-3" @click="$router.push('/loginRegister/login')">登录</t-button>
          <t-button class="mr-4" @click="$router.push('/loginRegister/register')">注册</t-button>
        </div>

        <div v-else class="flex justify-between items-center">
          <t-avatar class="mr-2">{{ userinfo.name[0] }}</t-avatar>
          <t-dropdown>
            <p class="mr-4 cursor-pointer">{{ userinfo.name }}</p>
            <template v-slot:dropdown>
              <t-dropdown-menu>
                <t-dropdown-item @click="$router.push('/user/info')">个人信息</t-dropdown-item>
                <t-dropdown-item @click="$router.push('/user/password')">修改密码</t-dropdown-item>
                <t-dropdown-item @click="getUserStore().logout()">退出登录</t-dropdown-item>
              </t-dropdown-menu>
            </template>
          </t-dropdown>
          <span class="cursor-pointer mr-8" @click="$router.push('/controller')">控制台</span>
        </div>
      </template>
    </t-head-menu>
  </div>
</template>

<style scoped lang="less">

</style>
