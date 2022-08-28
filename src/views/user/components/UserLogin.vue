<script setup lang="ts">
import { getUserStore } from '@/store/modules/user_store'
import { onMounted, reactive, ref } from 'vue'

const userStore = getUserStore()
const loginForm = reactive({
  username: '',
  password: ''
})
const loginRules = reactive({
  username: [{
    required: true,
    message: '账号不能为空',
    type: 'error'
  }],
  password: [{
    required: true,
    message: '密码不能为空',
    type: 'error'
  }, {
    validator: (val) => {
      const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&.=_-])[A-Za-z\d$@!%*?&.=_-]{8,}$/
      return reg.test(val)
    },
    message: '密码由至少8位大小写字母和特殊字符和数字组成',
    type: 'error'
  }]
})
const passwordRepeatChecked = ref(false)

function passwordRepeat(event) {
  if (event) {
    localStorage.setItem('loginForm', JSON.stringify(loginForm))
  } else {
    localStorage.removeItem('loginForm')
  }
}

onMounted(() => {
  // 记住密码
  const value = JSON.parse(localStorage.getItem('loginForm') || '{}')
  if (localStorage.getItem('loginForm')) {
    passwordRepeatChecked.value = true
    loginForm.username = value.username
    loginForm.password = value.password
  }
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
        <t-input placeholder="请输入手机号或邮箱" size="large" v-model="loginForm.username"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0" name="password">
        <t-input placeholder="请输入密码" type="password" size="large" v-model="loginForm.password"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0">
        <t-button size="large" block type="submit">登录</t-button>
      </t-form-item>
      <t-form-item labelWidth="0">
        <div class="flex justify-between w-full cursor-pointer text-gray-500">
          <t-checkbox class="text-gray-500" v-model="passwordRepeatChecked" @change="passwordRepeat">记住密码</t-checkbox>
          <span @click="$router.push('password')">忘记密码?</span>
        </div>
      </t-form-item>
    </t-form>
  </div>
</template>

<style scoped lang="less">

</style>
