<script setup lang="ts">
import { reactive } from 'vue'
import { getUserStore } from '@/store/modules/user_store'
import { storeToRefs } from 'pinia'

const userStore = getUserStore()
const {
  time,
  timeTrue
} = storeToRefs(getUserStore())
const registerForm = reactive({
  name: '',
  username: '',
  code: '',
  email: '',
  password: '',
  passwordRepeat: ''
})

const registerRules = {
  name: [{
    required: true,
    message: '用户名不能为空',
    type: 'error'
  }],
  username: [{
    required: true,
    message: '手机号不能为空',
    type: 'error'
  }],
  code: [{
    required: true,
    message: '验证码不能为空',
    type: 'error'
  }],
  email: [{
    required: true,
    message: '邮箱不能为空',
    type: 'error'
  }],
  password: [{
    required: true,
    message: '密码不能为空',
    type: 'error'
  }, {
    validator: (val) => {
      const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.]{8,}$/
      return reg.test(val)
    },
    message: '密码由至少8位大小写字母和特殊字符组成',
    type: 'error'
  }],
  passwordRepeat: [{
    required: true,
    message: '重复密码不能为空',
    type: 'error'
  }, {
    validator: (val) => val === registerForm.password,
    message: '两次密码不相同',
    type: 'error'
  }]
}
</script>

<template>
  <div>
    <div class="mb-6">
      <span class="text-2xl mr-2">注册</span>
      <span class="text-gray-500 cursor-pointer" @click="$router.push('login')">登录</span>
    </div>
    <t-form :rules="registerRules" :data="registerForm" @submit="userStore.register($event,registerForm)">
      <t-form-item labelWidth="0" name="name">
        <t-input placeholder="请输入用户名" size="large" v-model="registerForm.name"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0" name="password">
        <t-input placeholder="请输入密码" type="password" size="large"
                 v-model="registerForm.password"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0" name="passwordRepeat">
        <t-input placeholder="请再次输入密码" type="password" size="large"
                 v-model="registerForm.passwordRepeat"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0" name="email">
        <t-input placeholder="请输入邮箱" size="large" v-model="registerForm.email"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0" name="phone">
        <t-input placeholder="请输入手机号" size="large" v-model="registerForm.username"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0" name="code">
        <t-input class="mr-3" placeholder="请输入验证码" size="large" v-model="registerForm.code"></t-input>
        <t-button size="large" @click="userStore.getCode(registerForm.username,'register')"
                  :disabled="!timeTrue">{{ timeTrue ? '获取验证码' : time + '后获取' }}
        </t-button>
      </t-form-item>
      <t-form-item labelWidth="0">
        <t-button size="large" block type="submit">注册</t-button>
      </t-form-item>
      <t-form-item labelWidth="0">
        <div class="flex justify-between w-full cursor-pointer text-gray-500">
          <span @click="$router.push('login')">已有账号？立即登录</span>
          <span @click="$router.push('password')">忘记密码?</span>
        </div>
      </t-form-item>
    </t-form>
  </div>
</template>

<style scoped lang="less">

</style>
