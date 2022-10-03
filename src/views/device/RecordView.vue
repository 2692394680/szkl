<script setup lang="ts">
import { RECORD_TABLE_COLUMNS } from '@/views/device/constants/nework_constants'
import { onMounted, reactive, ref } from 'vue'
import { DeviceApi } from '@/api/device_api'
import { MessagePlugin } from 'tdesign-vue-next'
import { storeToRefs } from 'pinia'
import { getUserStore } from '@/store/modules/user_store'
import { getIndexStore } from '@/store/index_store'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const indexStore = getIndexStore()
const deviceApi = new DeviceApi()
const { userinfo } = storeToRefs(getUserStore())
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
  const result: any = await deviceApi.authList({
    pageSize: tablePagination.defaultPageSize,
    current: tablePagination.defaultCurrent,
    isDelete: state.value,
    deviceId: route.query.id
  })
  deviceList.value = result.value.records
  deviceList.value = deviceList.value.filter(item => item.user.id !== userinfo.value.id)
  deviceList.value = deviceList.value.map(record => {
    record.device.useAuthUserId = record.user.id
    return record.device
  })
  tablePagination.total = deviceList.value.length
}

// 删除设备授权
async function deleteAuth(deviceId, userId) {
  await deviceApi.authDelete({ deviceId, userId })
  await MessagePlugin.success('删除授权成功')
  await getList()
}

// 关闭设备标签
function userTagClose() {
  // router.push('/device/record')
  router.go(-1)
  route.query.id = ''
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
        <div class="text-gray-500 mr-4">
          设备授权记录
        </div>
        <div>
          <t-tag v-if="route.query.id" closable @close="userTagClose">
            设备ID：{{ route.query.id }}
          </t-tag>
        </div>
      </div>
    </div>

    <t-table row-key="id" :data="deviceList" :columns="RECORD_TABLE_COLUMNS" stripe bordered hover
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
      <template #useAuthUserId="{row}">
        <t-tooltip content="点击复制" theme="light">
          <p class="cursor-pointer copy" @click="indexStore.copyHandle(row.createById)">{{row.createById}}</p>
        </t-tooltip>
      </template>
      <template #op="{row}">
        <div class="cursor-pointer text-blue-700">
          <t-popconfirm content="确定删除吗？该操作会导致该授权失效！" theme="danger"
                        @confirm="deleteAuth(row.id,row.useAuthUserId)">
            <a class="text-red-600 mr-4">删除</a>
          </t-popconfirm>
        </div>
      </template>
    </t-table>

  </div>
</template>

<style scoped lang="less">

</style>
