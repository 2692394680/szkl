<script setup lang="ts">
import { TABLE_COLUMNS } from '@/views/device/constants/nework_constants'
import { onMounted, reactive, ref } from 'vue'
import { DeviceApi } from '@/api/device_api'
import { MessagePlugin } from 'tdesign-vue-next'
import { storeToRefs } from 'pinia'
import { getDeviceStore } from '@/store/modules/device_store'
import { cloneDeep } from 'lodash'

const deviceApi = new DeviceApi()
const { deviceList, userId } = storeToRefs(getDeviceStore())
const tablePagination = reactive({
  defaultCurrent: 1,
  defaultPageSize: 8,
  total: 0
})

// 黑白名单状态
const state = ref(0)
// 对话框状态 1添加设备 2编辑设备
const deviceVisible = ref(false)
const deviceType = ref('添加设备')
// 设备表单
const deviceForm = ref({
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
  brand: [{ required: true }],
  note: [{ required: true }]
}

// 添加设备回调
function addDeviceHandler() {
  Object.keys(deviceForm.value).forEach(key => (deviceForm.value[key] = ''))
  deviceVisible.value = true
  deviceType.value = '添加设备'
}

// 编辑设备回调
function updateDeviceHandler(row) {
  deviceForm.value = cloneDeep(row)
  deviceVisible.value = true
  deviceType.value = '编辑设备'
}

// 获取设备列表
async function getList() {
  await getDeviceStore().getDeviceList({
    dataSize: tablePagination.defaultPageSize,
    index: tablePagination.defaultCurrent,
    isDelete: state.value,
    userId: userId.value
  })
  tablePagination.total = deviceList.value.length
}

// 添加/编辑设备
async function changeDevice(event) {
  Object.assign(deviceForm)
  if (typeof event.validateResult === 'object') return
  if (deviceType.value === '添加设备') {
    await deviceApi.add(deviceForm.value)
  } else {
    await deviceApi.update(deviceForm.value)
  }
  await MessagePlugin.success(deviceType.value + '成功')
  await getList()
  deviceVisible.value = false
}

// 禁用设备
async function disableDevice(id) {
  await deviceApi.disable({ deviceId: id })
  await getList()
  await MessagePlugin.success('禁用设备')
}

// 启用设备
async function enableDevice(id) {
  await deviceApi.enable({ deviceId: id })
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
        <div>
          <t-tag v-if="userId" closable @close="userTagClose">
            {{userId}}
          </t-tag>
        </div>
      </div>
      <div>
        <t-button @click="addDeviceHandler">添加设备</t-button>
      </div>
    </div>

    <t-table row-key="id" :data="deviceList" :columns="TABLE_COLUMNS" stripe bordered hover
             table-layout="fixed"
             :pagination="tablePagination">
      <template #op="{row}">
        <div class="cursor-pointer text-blue-700">
          <a class=" mr-4" @click="updateDeviceHandler(row)">编辑</a>
          <a v-show="state===0" @click="disableDevice(row.id)">禁用</a>
          <a v-show="state===1" @click="enableDevice(row.id)">启用</a>
        </div>
      </template>
    </t-table>

    <t-dialog v-model:visible="deviceVisible" :destroyOnClose="true" :footer="false">
      <t-form :data="deviceForm" label-align="left" @submit="changeDevice"
              :rules="addDeviceRules">
        <t-form-item labelWidth="0">
          <div class="text-2xl">{{ deviceType }}</div>
        </t-form-item>
        <t-form-item label="设备名称" name="name">
          <t-input placeholder="请输入设备名称" v-model="deviceForm.name"></t-input>
        </t-form-item>
        <t-form-item label="设备品牌" name="brand">
          <t-input placeholder="请输入设备品牌" v-model="deviceForm.brand"></t-input>
        </t-form-item>
        <t-form-item label="设备MAC" name="mac">
          <t-input placeholder="请输入设备MAC" v-model="deviceForm.mac"></t-input>
        </t-form-item>
        <t-form-item label="设备SN" name="sn">
          <t-input placeholder="请输入设备SN" v-model="deviceForm.sn"></t-input>
        </t-form-item>
        <t-form-item label="设备位置" name="location">
          <t-input placeholder="请输入设备位置" v-model="deviceForm.location"></t-input>
        </t-form-item>
        <t-form-item label="备注" name="note">
          <t-input placeholder="请输入备注" v-model="deviceForm.note"></t-input>
        </t-form-item>
        <t-form-item>
          <div class="flex justify-end w-full">
            <t-button class="mr-4" theme="default" variant="base" type="reset">重置</t-button>
            <t-button type="submit">{{ deviceType }}</t-button>
          </div>
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>

<style scoped lang="less">

</style>
