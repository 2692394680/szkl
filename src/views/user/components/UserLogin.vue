<script setup lang="ts">
import { getUserStore } from '@/store/modules/user_store'
import { reactive } from 'vue'

const userStore = getUserStore()
const loginForm = reactive({
  phone: '19156574039',
  password: 'Luo123456.'
})
const loginRules = reactive({
  phone: [{
    required: true,
    message: '账号不能为空',
    type: 'error'
  }],
  password: [{
    required: true,
    message: '密码不能为空',
    type: 'error'
  }]
})
</script>

<template>
  <div>
    <div class="mb-6">
      <span class="text-2xl mr-2">登录</span>
      <span class="text-gray-500 cursor-pointer" @click="$router.push('register')">注册</span>
    </div>
    <t-form :rules="loginRules" :data="loginForm" @submit="userStore.login($event,loginForm)">
      <t-form-item labelWidth="0" name="username">
        <t-input placeholder="请输入手机号或邮箱" size="large" v-model="loginForm.phone"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0" name="password">
        <t-input placeholder="请输入密码" type="password" size="large" v-model="loginForm.password"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0">
        <t-button size="large" block type="submit">登录</t-button>
      </t-form-item>
      <t-form-item labelWidth="0">
        <div class="flex justify-between w-full cursor-pointer text-gray-500">
          <t-checkbox class="text-gray-500">记住密码</t-checkbox>
          <span @click="$router.push('password')">忘记密码?</span>
        </div>
      </t-form-item>
    </t-form>
  </div>
</template>

<style scoped lang="less">

</style>
