<script setup lang="ts">
import { computed } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const token = computed(() => {
  return localStorage.getItem('token')
})

function logout() {
  MessagePlugin.success('退出登录成功')
  localStorage.removeItem('token')
  router.push('/loginRegister/login')
}
</script>
<script lang="ts">
export default {
  name: 'TheHeader'
}
</script>

<template>
  <div class="header-box">
    <t-head-menu theme="dark" height="120px">
      <p class="text-3xl text-white cursor-pointer" @click="$router.push('/')">SZKelian</p>

      <template #operations>
        <div v-if="!token">
          <t-button class="mr-3" @click="$router.push('/loginRegister/login')">登录</t-button>
          <t-button class="mr-4" @click="$router.push('/loginRegister/register')">注册</t-button>
        </div>

        <div v-else>
          <t-dropdown>
            <p class="mr-4 cursor-pointer">张三</p>
            <template v-slot:dropdown>
              <t-dropdown-menu>
                <t-dropdown-item>个人信息</t-dropdown-item>
                <t-dropdown-item>修改密码</t-dropdown-item>
                <t-dropdown-item @click="logout">退出登录</t-dropdown-item>
              </t-dropdown-menu>
            </template>
          </t-dropdown>
        </div>
      </template>
    </t-head-menu>
  </div>
</template>

<style scoped lang="less">

</style>
