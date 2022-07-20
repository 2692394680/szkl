<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

function login() {
  localStorage.setItem('token', 'token')
  router.push('/home')
  MessagePlugin.success('登陆成功')
}
</script>

<template>
  <div>
    <div class="mb-6">
      <span class="text-2xl mr-2">登录</span>
      <span class="text-gray-500 cursor-pointer" @click="$router.push('register')">注册</span>
    </div>
    <t-form>
      <t-form-item labelWidth="0">
        <t-input placeholder="请输入用户名" size="large"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0">
        <t-input placeholder="请输入密码" type="password" size="large"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0">
        <t-button size="large" block @click="login">登录</t-button>
      </t-form-item>
      <t-form-item labelWidth="0">
        <div class="flex justify-between w-full cursor-pointer text-gray-500">
          <t-checkbox class="text-gray-500">记住密码</t-checkbox>
          <span>忘记密码?</span>
        </div>
      </t-form-item>
    </t-form>
  </div>
</template>

<style scoped lang="less">

</style>
