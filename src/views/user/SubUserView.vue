<script setup lang="ts">
import UserHeader from '@/views/user/components/UserHeader.vue'
import { onMounted, reactive, ref } from 'vue'
import { TABLE_COLUMNS } from '@/views/user/constants/sub-user_constants'
import { REGISTER_RULES } from '@/views/user/constants/rules_constants'
import { UserApi } from '@/api/user_api'
import { MessagePlugin } from 'tdesign-vue-next'
import { cloneDeep } from 'lodash'
import { useRoute, useRouter } from 'vue-router'
import { DeviceApi } from '@/api/device_api'

const userApi = new UserApi()
const deviceApi = new DeviceApi()
const router = useRouter()
const route = useRoute()
const subUserList = ref([])
const tablePagination = reactive({
  defaultCurrent: 1,
  defaultPageSize: 8,
  total: 0
})
const state = ref(0)
const subUserVisible = ref(false)
const passwordRepeatVisible = ref(false)
const toUserVisible = ref(false)
const subUserType = ref('添加子用户')
const subUserForm = ref({
  name: '',
  phone: '',
  password: '',
  passwordRepeat: '',
  email: '',
  note: ''
})
// 授权设备表单
const toUserForm = reactive({
  deviceId: '',
  userId: '',
  note: ''
})
const subUserPasswordRepeatForm = reactive({
  password: '',
  passwordRepeat: '',
  userId: ''
})
const subUserRules = Object.assign(REGISTER_RULES, {
  passwordRepeat: [{
    required: true,
    message: '重复密码不能为空',
    type: 'error'
  }, {
    validator: (val) => val === subUserForm.value.password,
    message: '两次密码不相同',
    type: 'error'
  }]
})
const subUserPasswordRepeatRules = {
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
  }],
  passwordRepeat: [{
    required: true,
    message: '重复密码不能为空',
    type: 'error'
  }, {
    validator: (val) => val === subUserPasswordRepeatForm.password,
    message: '两次密码不相同',
    type: 'error'
  }]
}

// 添加子用户回调
function addSubUserHandler() {
  Object.keys(subUserForm.value).forEach(key => (subUserForm.value[key] = ''))
  subUserVisible.value = true
  subUserType.value = '添加子用户'
}

// 编辑子用户回调
function updateSubUserHandler(row) {
  subUserForm.value = cloneDeep(row)
  subUserForm.value.password = ''
  subUserVisible.value = true
  subUserType.value = '编辑子用户'
}

// 重置密码回调
function passwordRepeatHandler(userId) {
  passwordRepeatVisible.value = true
  subUserPasswordRepeatForm.userId = userId
}

// 获取子用户列表
async function getList() {
  const result: any = await userApi.subList({
    current: tablePagination.defaultCurrent,
    pageSize: tablePagination.defaultPageSize,
    isDelete: state.value
  })
  subUserList.value = result.value.records
  tablePagination.total = subUserList.value.length
}

// 新增/编辑子用户
async function changeSubUser(event) {
  Object.assign(subUserForm.value)
  if (typeof event.validateResult === 'object') return
  if (subUserType.value === '添加子用户') {
    await userApi.subAdd(subUserForm.value)
  } else {
    await userApi.subUpdate(subUserForm.value)
  }
  await MessagePlugin.success(subUserType.value + '成功')
  await getList()
  subUserVisible.value = false
}

// 禁用用户
async function subUserDisable(id) {
  await userApi.subDisable({ userId: id })
  await getList()
  await MessagePlugin.success('禁用用户')
}

// 启用用户
async function subUserEnable(id) {
  await userApi.subEnable({ userId: id })
  await getList()
  await MessagePlugin.success('启用用户')
}

// 重置子用户密码
async function subUserPasswordRepeat(event) {
  if (typeof event.validateResult === 'object') return
  await userApi.subPasswordRepeat(subUserPasswordRepeatForm)
  await MessagePlugin.success('重置密码成功')
  passwordRepeatVisible.value = true
}

// 前往子用户设备列表
function goDevice(id) {
  router.push('/device/auth?id=' + id)
}

// 关闭设备标签
function deviceTagClose() {
  router.go(-1)
  toUserForm.deviceId = ''
  getList()
}

function changeToUser(userId) {
  toUserForm.userId = userId
  toUserVisible.value = true
}

function toUserHandle() {
  toUser()
  toUserForm.note = ''
  toUserVisible.value = false
}

// 授权设备给用户
async function toUser() {
  if (!toUserForm.note) toUserForm.note = '备注'
  await deviceApi.toUser(toUserForm)
  await MessagePlugin.success('授权成功')
}

onMounted(() => {
  if (route.query.id) toUserForm.deviceId = route.query.id + ''
  getList()
})
</script>

<template>
  <UserHeader></UserHeader>
  <!--  <div class="mt-10">-->
  <!--    <div class="text-xl mb-4">子账号管理</div>-->
  <!--  </div>-->

  <div class="flex justify-between mb-4">
    <div class="flex items-center">
      <t-tabs v-model="state" :default-value="0" @change="getList">
        <t-tab-panel :value="0" label="白名单"></t-tab-panel>
        <t-tab-panel :value="1" label="黑名单"></t-tab-panel>
      </t-tabs>
      <div>
        <t-tag v-if="toUserForm.deviceId" closable @close="deviceTagClose">
          设备ID：{{ toUserForm.deviceId }}
        </t-tag>
      </div>
    </div>
    <div>
      <t-button @click="addSubUserHandler">添加子用户</t-button>
    </div>
  </div>

  <t-table row-key="id" :columns="TABLE_COLUMNS" stripe bordered hover
           table-layout="fixed" :data="subUserList"
           :pagination="tablePagination">
    <template #createTime="{row}">
      <div>
        {{ row.createTime }}
      </div>
    </template>
    <template #op="{row}">
      <div class="cursor-pointer text-blue-700" v-if="toUserForm.deviceId">
        <a @click="changeToUser(row.id)">选择</a>
      </div>
      <div class="cursor-pointer text-blue-700" v-else>
        <t-dropdown trigger="click">
          <a class="mr-4">查看</a>
          <template #dropdown>
            <t-dropdown-menu>
              <t-dropdown-item @click="goDevice(row.id)">设备列表</t-dropdown-item>
              <t-dropdown-item>用户日志</t-dropdown-item>
            </t-dropdown-menu>
          </template>
        </t-dropdown>
        <a class="mr-4" @click="updateSubUserHandler(row)">编辑</a>
        <a v-show="state===0" @click="subUserDisable(row.id)">禁用</a>
        <a v-show="state===1" @click="subUserEnable(row.id)">启用</a>
        <a class="ml-4" @click="passwordRepeatHandler(row.id)">重置密码</a>
      </div>
    </template>
  </t-table>

  <!--添加子用户-->
  <t-dialog v-model:visible="subUserVisible" :destroyOnClose="true" :footer="false">
    <t-form :data="subUserForm" :rules="subUserRules" @submit="changeSubUser">
      <t-form-item labelWidth="0">
        <div class="text-2xl">{{ subUserType }}</div>
      </t-form-item>
      <t-form-item label="用户名" name="name">
        <t-input placeholder="请输入用户名" size="large" v-model="subUserForm.name"></t-input>
      </t-form-item>
      <t-form-item label="密码" name="password" v-if="subUserType==='添加子用户'">
        <t-input placeholder="请输入密码" type="password" size="large"
                 v-model="subUserForm.password"></t-input>
      </t-form-item>
      <t-form-item label="确认密码" name="passwordRepeat" v-if="subUserType==='添加子用户'">
        <t-input placeholder="请再次输入密码" type="password" size="large"
                 v-model="subUserForm.passwordRepeat"></t-input>
      </t-form-item>
      <t-form-item label="邮箱" name="email">
        <t-input placeholder="请输入邮箱" size="large" v-model="subUserForm.email"></t-input>
      </t-form-item>
      <t-form-item label="手机号" name="phone">
        <t-input placeholder="请输入手机号" size="large" v-model="subUserForm.phone"></t-input>
      </t-form-item>
      <t-form-item label="备注" name="note">
        <t-textarea placeholder="请输入备注" v-model="subUserForm.note"></t-textarea>
      </t-form-item>
      <t-form-item>
        <div class="flex justify-end w-full">
          <t-button class="mr-4" theme="default" variant="base" type="reset">重置</t-button>
          <t-button type="submit">确定</t-button>
        </div>
      </t-form-item>
    </t-form>
  </t-dialog>

  <!--重置密码-->
  <t-dialog v-model:visible="passwordRepeatVisible" destroyOnClose :footer="false">
    <t-form :data="subUserPasswordRepeatForm" :rules="subUserPasswordRepeatRules"
            @submit="subUserPasswordRepeat">
      <t-form-item labelWidth="0">
        <div class="text-2xl">重置密码</div>
      </t-form-item>
      <t-form-item label="密码" name="password">
        <t-input placeholder="请输入密码" type="password" size="large"
                 v-model="subUserPasswordRepeatForm.password"></t-input>
      </t-form-item>
      <t-form-item label="确认密码" name="passwordRepeat">
        <t-input placeholder="请再次输入密码" type="password" size="large"
                 v-model="subUserPasswordRepeatForm.passwordRepeat"></t-input>
      </t-form-item>
      <t-form-item>
        <t-button type="submit">确定</t-button>
      </t-form-item>
    </t-form>
  </t-dialog>

  <t-dialog v-model:visible="toUserVisible" destoryOnClose header="此操作会赋予该用户设备使用权" @confirm="toUserHandle">
    <t-input v-model="toUserForm.note" label="备注：" placeholder="设备备注"></t-input>
  </t-dialog>
</template>

<style scoped lang="less">

</style>
