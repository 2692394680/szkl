<script setup lang="ts">
import { AUTH_TABLE_COLUMNS } from '@/views/device/constants/nework_constants'
import { onMounted, reactive, ref } from 'vue'
import { DeviceApi } from '@/api/device_api'
import { MessagePlugin } from 'tdesign-vue-next'
import { storeToRefs } from 'pinia'
import { getDeviceStore } from '@/store/modules/device_store'
import { getIndexStore } from '@/store/index_store'

const deviceApi = new DeviceApi()
const indexStore = getIndexStore()
const {
  userId
} = storeToRefs(getDeviceStore())
const deviceList = ref<any>([])
const tablePagination = reactive({
  defaultCurrent: 1,
  defaultPageSize: 8,
  total: 0
})

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
  // deviceList.value = deviceList.value.filter(item => item.createById !== userinfo.value.id)
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
  userId.value = ''
  getList()
}

onMounted(() => {
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
             table-layout="fixed"
             :pagination="tablePagination">
      <template #id="{row}">
        <t-tooltip content="点击复制" theme="light">
          <p class="cursor-pointer copy" @click="indexStore.copyHandle(row.id)">{{row.id}}</p>
        </t-tooltip>
      </template>
      <template #createById="{row}">
        <t-tooltip content="点击复制" theme="light">
          <p class="cursor-pointer copy" @click="indexStore.copyHandle(row.createById)">{{row.createById}}</p>
        </t-tooltip>
      </template>
      <template #op="{row}">
        <div class="cursor-pointer text-blue-700">
          <a class="text-red-600" v-show="state===0" @click="disableDevice(row.id)">禁用</a>
          <a v-show="state===1" @click="enableDevice(row.id)">启用</a>
        </div>
      </template>
    </t-table>

  </div>
</template>

<style scoped lang="less">

</style>
