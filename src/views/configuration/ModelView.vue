<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ConfigurationApi } from '@/api/configuration_api'
import { useRouter } from 'vue-router'
import { TABLE_COLUMNS } from '@/views/configuration/constants/model_constants'
import { getDeviceStore } from '@/store/modules/device_store'
import { storeToRefs } from 'pinia'

const router = useRouter()
const configurationApi = new ConfigurationApi()
const { deviceList } = storeToRefs(getDeviceStore())
const tableData = ref([])
const tablePagination = reactive({
  defaultCurrent: 1,
  defaultPageSize: 8,
  total: 0
})
// 新建组态弹窗
const addModelVisible = ref(false)
// 新增组态表单数据
const addModelForm = reactive({
  deviceId: 0,
  deviceName: '',
  modelName: ''
})
// 新增组态表单验证
const addModelRules = {
  modelName: [{
    required: true,
    message: '组态模型名称不能为空',
    type: 'error'
  }],
  deviceId: [{
    validator: (val) => val !== 0,
    message: '联网设备不能为空',
    type: 'error'
  }]
}
// 黑白名单状态
const state = ref(0)

// 获取模型组态列表
const getList = async() => {
  const result: any = await configurationApi.getList({
    dataSize: tablePagination.defaultPageSize,
    index: tablePagination.defaultCurrent,
    isDelete: 0
  })
  tableData.value = result?.value.records
  tablePagination.total = tableData.value.length
}

// 添加模型组态
const addModel = async(event) => {
  // if (typeof event.validateResult === 'object') return
  // const file = new File([JSON.stringify([{}])], 'test.json', {
  //   type: 'application/json',
  //   lastModified: Date.now()
  // })
  // const formData = new FormData()
  // formData.append('module', file)
  // formData.append('modelName', addModelForm.modelName)
  // const result: any = await configurationApi.add(addModelForm.deviceId, formData)
  // if (result) await router.push('Design')
  await router.push('Design')
}

// 打开新增组态对话框
function openModelDialog() {
  addModelVisible.value = true
  getDeviceStore().getDeviceList(1, 8)
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
        <t-button @click="openModelDialog">添加组态</t-button>
      </div>
    </div>

    <t-dialog v-model:visible="addModelVisible" :footer="false">
      <t-form :data="addModelForm" :rules="addModelRules" @submit="addModel">
        <t-form-item labelWidth="0">
          <div class="text-2xl">添加组态</div>
        </t-form-item>
        <t-form-item name="modelName" label="组态名称">
          <t-input v-model="addModelForm.modelName"></t-input>
        </t-form-item>
        <t-form-item name="deviceId" label="绑定设备">
          <t-select placeholder="请选择联网设备" @change="addModelForm.deviceId=$event">
            <t-option v-for="(item,index) in deviceList" :key="index" :label="item.deviceName"
                      :value="item.deviceId"></t-option>
          </t-select>
        </t-form-item>
        <t-form-item>
          <div class="flex justify-end w-full">
            <t-button class="mr-2" theme="default" @click="addModelVisible=false">取消</t-button>
            <t-button type="submit">添加</t-button>
          </div>
        </t-form-item>
      </t-form>
    </t-dialog>

    <t-table row-key="moduleId" :data="tableData" :columns="TABLE_COLUMNS" stripe bordered hover
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
