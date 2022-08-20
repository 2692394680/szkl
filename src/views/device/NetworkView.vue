<script setup lang="ts">
import { TABLE_COLUMNS } from '@/views/device/constants/nework_constants'
import { onMounted, reactive, ref } from 'vue'
import { DeviceApi } from '@/api/device_api'
import { MessagePlugin } from 'tdesign-vue-next'

const deviceApi = new DeviceApi()
const tableData = ref([])
const tablePagination = reactive({
  defaultCurrent: 1,
  defaultPageSize: 8,
  total: 0
})

// 黑白名单状态
const state = ref(0)
// 对话框状态
const addDeviceVisible = ref(false)
// 添加设备表单
const addDeviceForm = reactive({
  name: '',
  note: '',
  sn: '',
  mac: '',
  image: 'http://dummyimage.com/400x400',
  location: '',
  brand: '',
  isDelete: 0
})
const addDeviceRules = {
  name: [{ required: true }],
  sn: [{ required: true }],
  mac: [{ required: true }],
  location: [{ required: true }],
  brand: [{ required: true }]
}

// 获取设备列表
async function getList() {
  const result: any = await deviceApi.getList({
    current: tablePagination.defaultCurrent,
    dataSize: tablePagination.defaultPageSize,
    state: state.value
  }) || {}
  tableData.value = result.value?.records
}

// 添加设备
async function addDevice(event) {
  Object.assign(addDeviceForm)
  if (typeof event.validateResult === 'object') return
  await deviceApi.add(addDeviceForm)
  await MessagePlugin.success('添加设备成功')
  await getList()
  addDeviceVisible.value = false
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
        <t-button @click="addDeviceVisible=true">添加设备</t-button>
      </div>
    </div>

    <t-table row-key="id" :data="tableData" :columns="TABLE_COLUMNS" stripe bordered hover
             table-layout="fixed"
             :pagination="tablePagination">
      <template #op>
        <div class="cursor-pointer text-blue-700">
          <a class=" mr-4">编辑</a>
          <a v-show="state===0">禁用</a>
          <a v-show="state===1">启用</a>
        </div>
      </template>
    </t-table>

    <t-dialog v-model:visible="addDeviceVisible" :destroyOnClose="true" :footer="false">
      <div class="text-2xl h-14">添加设备</div>
      <t-form :data="addDeviceForm" label-align="left" @submit="addDevice" :rules="addDeviceRules">
        <t-form-item label="设备名称" name="name">
          <t-input placeholder="请输入设备名称" v-model="addDeviceForm.name"></t-input>
        </t-form-item>
        <t-form-item label="设备品牌" name="brand">
          <t-input placeholder="请输入设备品牌" v-model="addDeviceForm.brand"></t-input>
        </t-form-item>
        <t-form-item label="设备MAC" name="mac">
          <t-input placeholder="请输入设备MAC" v-model="addDeviceForm.mac"></t-input>
        </t-form-item>
        <t-form-item label="设备SN" name="sn">
          <t-input placeholder="请输入设备SN" v-model="addDeviceForm.sn"></t-input>
        </t-form-item>
        <t-form-item label="设备位置" name="location">
          <t-input placeholder="请输入设备位置" v-model="addDeviceForm.location"></t-input>
        </t-form-item>
        <t-form-item label="备注" name="note">
          <t-input placeholder="请输入备注" v-model="addDeviceForm.note"></t-input>
        </t-form-item>
        <t-form-item>
          <div class="flex justify-end w-full">
            <t-button class="mr-4" theme="default" variant="base" type="reset">重置</t-button>
            <t-button type="submit">添加设备</t-button>
          </div>
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>

<style scoped lang="less">

</style>
