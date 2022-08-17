<script setup lang="ts">
import { getUserStore } from '@/store/modules/user_store'
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { UserApi } from '@/api/user_api'
import { MessagePlugin } from 'tdesign-vue-next'
import { useRouter } from 'vue-router'

const userStore = getUserStore()
const {
  time,
  timeTrue
} = storeToRefs(getUserStore())
const userApi = new UserApi()
const router = useRouter()
const passwordResetForm = reactive({
  phone: '',
  password: '',
  passwordRepeat: '',
  code: ''
})
const passwordResetRules = reactive({
  phone: [{
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
    validator: (val) => val === passwordResetForm.password,
    message: '两次密码不相同',
    type: 'error'
  }]
})

async function passwordReset(event) {
  if (typeof event.validateResult === 'object') return
  userApi.passwordReset(passwordResetForm)
  await MessagePlugin.success('重置密码成功，请登录')
  await router.push('/loginRegister/login')
}
</script>

<template>
  <div>
    <div class="mb-6">
      <span class="text-2xl mr-2">找回密码</span>
      <span class="text-gray-500 cursor-pointer" @click="$router.push('login')">登录</span>
    </div>
    <t-form :rules="passwordResetRules" :data="passwordResetForm"
            @submit="passwordReset">
      <t-form-item labelWidth="0" name="password">
        <t-input placeholder="请输入新密码" type="password" size="large"
                 v-model="passwordResetForm.password"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0" name="passwordRepeat">
        <t-input placeholder="请再次输入新密码" type="password" size="large"
                 v-model="passwordResetForm.passwordRepeat"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0" name="phone">
        <t-input placeholder="请输入手机号" size="large" v-model="passwordResetForm.phone"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0" name="code">
        <t-input class="mr-3" placeholder="请输入验证码" size="large" v-model="passwordResetForm.code"></t-input>
        <t-button size="large" @click="userStore.getCode(passwordResetForm.phone,'password')"
                  :disabled="!timeTrue">{{ timeTrue ? '获取验证码' : time + '后获取' }}
        </t-button>
      </t-form-item>
      <t-form-item labelWidth="0">
        <t-button size="large" block type="submit">重置密码</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>

<style scoped lang="less">

</style>
