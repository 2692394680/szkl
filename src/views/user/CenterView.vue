<script setup lang="ts">
import { getUserStore } from '@/store/modules/user_store'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import { UserApi } from '@/api/user_api'
import { MessagePlugin } from 'tdesign-vue-next'
import UserHeader from '@/views/user/components/UserHeader.vue'

const userStore = getUserStore()
const {
  time,
  timeTrue,
  userinfo
} = storeToRefs(getUserStore())
const userApi = new UserApi()

const isEdit = ref(false)
const userinfoForm = reactive({
  name: userinfo.value.name,
  phone: userinfo.value.phone,
  email: userinfo.value.email,
  note: userinfo.value.note,
  code: ''
})

async function updateUserinfo(event) {
  if (typeof event.validateResult === 'object') return
  await userApi.userinfoUpdate(userinfoForm)
  await MessagePlugin.success('修改信息成功')
  await userStore.getUserInfo()
  isEdit.value = false
}
</script>

<template>
  <UserHeader></UserHeader>
  <div class="mt-10">
    <div class="text-xl">个人信息</div>
    <div class="w-1/3 text-gray-700 mt-4">
      <t-form :data="userinfoForm" @submit="updateUserinfo">
        <t-form-item label="用户名">
          <span v-if="!isEdit">{{ userinfo.name }}</span>
          <t-input v-else v-model="userinfoForm.name" size="large"></t-input>
        </t-form-item>
        <t-form-item label="手机号">
          <span v-if="!isEdit">{{ userinfo.phone }}</span>
          <t-input v-else v-model="userinfoForm.phone" size="large"></t-input>
        </t-form-item>
        <t-form-item label="邮箱">
          <span v-if="!isEdit">{{ userinfo.email }}</span>
          <t-input v-else v-model="userinfoForm.email" size="large"></t-input>
        </t-form-item>
        <t-form-item label="备注">
          <span v-if="!isEdit">{{ userinfo.note }}</span>
          <t-textarea v-else v-model="userinfoForm.note" size="large"></t-textarea>
        </t-form-item>
        <t-form-item label="验证码" name="code" v-if="isEdit">
          <t-input class="mr-4" placeholder="请输入验证码" size="large" v-model="userinfoForm.code"></t-input>
          <t-button size="large" @click="userStore.getCode(userinfoForm.phone,'userinfo')"
                    :disabled="!timeTrue">{{ timeTrue ? '获取验证码' : time + '后获取' }}
          </t-button>
        </t-form-item>
        <t-form-item label="">
          <t-button v-if="!isEdit" @click="isEdit=true">修改信息</t-button>
          <t-button v-else type="submit">保存修改</t-button>
        </t-form-item>
      </t-form>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
