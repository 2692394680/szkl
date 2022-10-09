<script setup lang="ts">
import { AUTH_TABLE_COLUMNS } from '@/views/device/constants/nework_constants'
import { onMounted, reactive, ref } from 'vue'
import { DeviceApi } from '@/api/device_api'
import { MessagePlugin } from 'tdesign-vue-next'
import { getIndexStore } from '@/store/index_store'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { getUserStore } from '@/store/modules/user_store'
import moment from 'moment'

const route = useRoute()
const router = useRouter()
const { userinfo } = storeToRefs(getUserStore())
const deviceApi = new DeviceApi()
const indexStore = getIndexStore()
const deviceList = ref<any>([])
const tablePagination = reactive({
  defaultCurrent: 1,
  defaultPageSize: 8,
  total: 0
})
const sort = reactive({ sortBy: 'createTime', descending: false })

const authNoteForm = reactive({
  deviceId: '',
  userId: '',
  note: ''
})
const authNoteVisible = ref(false)
const userId = ref('')

// 黑白名单状态
const state = ref(0)

// 获取设备列表
async function getList() {
  const result: any = await deviceApi.useList({
    pageSize: tablePagination.defaultPageSize,
    current: tablePagination.defaultCurrent,
    isDelete: state.value,
    userId: userId.value
  })
  deviceList.value = result.value.records
  deviceList.value = deviceList.value.filter(item => item.createById !== userinfo.value.id)
  tablePagination.total = deviceList.value.length
}

// 禁用设备
async function disableDevice(id) {
  await deviceApi.authDisable({ deviceId: id })
  await getList()
  await MessagePlugin.success('禁用设备')
}

// 启用设备
async function enableDevice(id) {
  await deviceApi.authEnable({ deviceId: id })
  await getList()
  await MessagePlugin.success('启用设备')
}

// 关闭用户标签
function userTagClose() {
  router.go(-1)
  userId.value = ''
  getList()
}

// 修改设备备注回调
function authNoteHandler(deviceId, userId) {
  authNoteVisible.value = true
  authNoteForm.deviceId = deviceId
  authNoteForm.userId = userId
}

// 修改设备备注
async function authNoteEdit() {
  await deviceApi.authNote(authNoteForm)
  await MessagePlugin.success('备注修改成功')
  await getList()
  authNoteVisible.value = false
}

function sortChange() {
  sort.descending = !sort.descending
  getList()
}

onMounted(() => {
  if (route.query.id) userId.value = route.query.id + ''
  getList()
})
</script>

<template>
  <div>
    <div class="flex justify-between mb-4">
      <div class="flex items-center">
        <t-tabs v-model="state" :default-value="0" @change="getList" class="mr-4">
          <t-tab-panel :value="0" label="白名单"></t-tab-panel>
          <t-tab-panel :value="1" label="黑名单"></t-tab-panel>
        </t-tabs>
        <div class="text-gray-500 mr-4">
          使用权设备
        </div>
        <div>
          <t-tag v-if="userId" closable @close="userTagClose">
            用户ID：{{ userId }}
          </t-tag>
        </div>
      </div>
    </div>

    <t-table row-key="id" :data="deviceList" :columns="AUTH_TABLE_COLUMNS" stripe bordered hover
             table-layout="auto" :pagination="tablePagination" :sort="sort" @sortChange="sortChange">
      <template #id="{row}">
        <t-tooltip content="点击复制" theme="light">
          <p class="cursor-pointer copy" @click="indexStore.copyHandle(row.id)">{{ row.id }}</p>
        </t-tooltip>
      </template>
      <template #createById="{row}">
        <t-tooltip content="点击复制" theme="light">
          <p class="cursor-pointer copy" @click="indexStore.copyHandle(row.createById)">
            {{ row.createById }}</p>
        </t-tooltip>
      </template>
      <template #createTime="{row}">
        {{
          moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')
        }}
      </template>
      <template #op="{row}">
        <div class="cursor-pointer text-blue-700">
          <a class="mr-4" @click="authNoteHandler(row.id,row.createById)">修改</a>
          <a class="text-red-600" v-show="state===0" @click="disableDevice(row.id)">禁用</a>
          <a v-show="state===1" @click="enableDevice(row.id)">启用</a>
        </div>
      </template>
    </t-table>

    <!--编辑设备-->
    <t-dialog v-model:visible="authNoteVisible" destoryOnClose header="修改备注" @confirm="authNoteEdit">
      <t-input v-model="authNoteForm.note" label="备注：" placeholder="设备备注"></t-input>
    </t-dialog>
  </div>
</template>

<style scoped lang="less">

</style>
