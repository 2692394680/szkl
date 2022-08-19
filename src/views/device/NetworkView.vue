<script setup lang="ts">
import { TABLE_COLUMNS } from '@/views/device/constants/nework_constants'
import { onMounted, reactive, ref } from 'vue'
import { DeviceApi } from '@/api/device_api'

const deviceApi = new DeviceApi()
const tableData = ref([])
const tablePagination = reactive({
  defaultCurrent: 1,
  defaultPageSize: 8,
  total: 0
})

// 黑白名单状态
const state = ref(0)

// 获取设备列表
async function getList() {
  const result: any = await deviceApi.getList({
    current: tablePagination.defaultCurrent,
    dataSize: tablePagination.defaultPageSize,
    state: state.value
  }) || {}
  tableData.value = result.value?.records
}

onMounted(() => {
  getList()
})
</script>

<template>
  <div>
    <div class="flex justify-between mb-4">
      <div>
        <t-tabs v-model="state" :default-value="0" @change="getList">
          <t-tab-panel :value="0" label="白名单"></t-tab-panel>
          <t-tab-panel :value="1" label="黑名单"></t-tab-panel>
        </t-tabs>
      </div>
      <div>
        <t-button>新增设备</t-button>
      </div>
    </div>

    <t-table row-key="id" :data="tableData" :columns="TABLE_COLUMNS" stripe bordered hover
             table-layout="fixed"
             :pagination="tablePagination">
      <template #op>
        <div class="cursor-pointer text-blue-700">
          <a class=" mr-4">编辑</a>
          <a>删除</a>
        </div>
      </template>
    </t-table>
  </div>
</template>

<style scoped lang="less">

</style>
