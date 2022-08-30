<script setup lang="ts">
import {reactive} from 'vue'
import {getUserStore} from '@/store/modules/user_store'
import {storeToRefs} from 'pinia'
import {REGISTER_RULES} from '@/views/user/constants/rules_constants'

const userStore = getUserStore()
const {
  time,
  timeTrue
} = storeToRefs(getUserStore())
const registerForm = reactive({
  name: '',
  phone: '',
  code: '',
  email: '',
  password: '',
  passwordRepeat: ''
})

const registerRules = Object.assign(REGISTER_RULES, {
  passwordRepeat: [{
    required: true,
    message: '重复密码不能为空',
    type: 'error'
  }, {
    validator: (val) => val === registerForm.password,
    message: '两次密码不相同',
    type: 'error'
  }]
})
</script>

<template>
  <div>
    <div class="mb-6">
      <span class="text-2xl mr-2">注册</span>
      <span class="text-gray-500 cursor-pointer" @click="$router.push('login')">登录</span>
    </div>
    <t-form :rules="registerRules" :data="registerForm" @submit="userStore.register($event,registerForm)">
      <t-form-item labelWidth="0" name="name">
        <!--autocomplete="new-password" 解决浏览器自动填充密码问题-->
        <t-input placeholder="请输入用户名" size="large" v-model="registerForm.name" autocomplete="new-password"
                 style="display:none;width:0;height:0;"></t-input>
        <t-input placeholder="请输入用户名" size="large" v-model="registerForm.name"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0" name="password">
        <t-input placeholder="请输入密码" type="password" size="large"
                 v-model="registerForm.password" autocomplete="new-password"
                 style="display:none;width:0;height:0;"></t-input>
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
        <t-input placeholder="请输入手机号" size="large" v-model="registerForm.phone"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0" name="code">
        <t-input class="mr-3" placeholder="请输入验证码" size="large" v-model="registerForm.code"></t-input>
        <t-button size="large" @click="userStore.getCode(registerForm.phone,'register')"
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
