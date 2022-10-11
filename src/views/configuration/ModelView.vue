<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ConfigurationApi } from '@/api/configuration_api'
import { TABLE_COLUMNS } from '@/views/configuration/constants/model_constants'
import { BASE_URL, TOKEN_NAME } from '@/config/global'
import { MessagePlugin } from 'tdesign-vue-next'
import { getIndexStore } from '@/store/index_store'

const indexStore = getIndexStore()
const configurationApi = new ConfigurationApi()
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
  name: '',
  deviceId: '',
  image: '',
  note: ''
})
// 新增组态表单验证
const addModelRules = {
  name: [{
    required: true
  }],
  deviceId: [{
    required: true
  }],
  note: [{
    required: true
  }],
  image: [{ required: true }]
}
// 黑白名单状态
const state = ref(0)
// 排序
const sort = reactive({
  sortBy: 'createTime',
  descending: false
})
// 上传图片请求头
const uploadHeaders = reactive({
  [TOKEN_NAME]: localStorage.getItem(TOKEN_NAME)
})

// 获取模型组态列表
async function getList() {
  const result: any = await configurationApi.list({
    dataSize: tablePagination.defaultPageSize,
    index: tablePagination.defaultCurrent,
    isDelete: state.value
  })
  tableData.value = result?.value.records
  tablePagination.total = tableData.value.length
}

// 上传模型组态
async function addModel(event) {
  if (typeof event.validateResult === 'object') return
  const file = new File([JSON.stringify([{}])], addModelForm.name + '.json', {
    type: 'application/json',
    lastModified: Date.now()
  })
  const formData = new FormData()
  formData.append('model', file)
  await configurationApi.add(addModelForm, formData)
  await MessagePlugin.success('添加成功')
  // await router.push('Design')
}

// 打开新增组态对话框
function openModelDialog() {
  // router.push('Design')
  addModelVisible.value = true
}

// 删除图片
async function deleteImage() {
  await configurationApi.deleteImage({ path: addModelForm.image })
  console.log('删除了图片')
}

// 关闭新增组态对话框回调
function closeModelDialogHandler() {
  if (addModelForm.image) {
    deleteImage()
    addModelForm.image = ''
  }
}

// 表格排序
function sortChange() {
  sort.descending = !sort.descending
  getList()
}

// 上传图片之前
function beforeUploadHandler(e) {
  if (!addModelForm.deviceId) {
    MessagePlugin.warning('设备ID不能为空')
    return false
  }
}

// 上传图片
function addImage(file) {
  const form = new FormData()
  form.append('image', file.raw)
  form.append('deviceId', addModelForm.deviceId)
  return new Promise(resolve => {
    file.percent = 0
    configurationApi.addImage(form).then((res: any) => {
      addModelForm.image = res.value
      resolve({
        status: 'success',
        response: { url: res.value }
      })
      MessagePlugin.success('上传成功')
      file.percent = 100
    })
  })
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

    <t-table row-key="moduleId" :data="tableData" :columns="TABLE_COLUMNS" stripe bordered hover
             table-layout="auto" :pagination="tablePagination" :sort="sort" @sortChange="sortChange">
      <template #id="{row}">
        <t-tooltip content="点击复制" theme="light">
          <p class="cursor-pointer copy" @click="indexStore.copyHandle(row.id)">
            {{ row.id }}</p>
        </t-tooltip>
      </template>
      <template #deviceId="{row}">
        <t-tooltip content="点击复制" theme="light">
          <p class="cursor-pointer copy" @click="indexStore.copyHandle(row.deviceId)">
            {{ row.deviceId }}</p>
        </t-tooltip>
      </template>
      <template #createTime="{row}">
        {{ formatDate(row.createTime) }}
      </template>
      <template #op>
        <div class="cursor-pointer text-blue-700">
          <a class=" mr-4">组态</a>
          <a class=" mr-4">编辑</a>
          <a class="text-red-600">禁用</a>
        </div>
      </template>
    </t-table>

    <t-dialog v-model:visible="addModelVisible" :footer="false" @close="closeModelDialogHandler">
      <t-form :data="addModelForm" :rules="addModelRules" @submit="addModel">
        <t-form-item labelWidth="0">
          <div class="text-2xl">添加组态</div>
        </t-form-item>
        <t-form-item name="name" label="组态名称">
          <t-input v-model="addModelForm.name"></t-input>
        </t-form-item>
        <t-form-item name="deviceId" label="绑定设备ID">
          <t-input v-model="addModelForm.deviceId"></t-input>
        </t-form-item>
        <t-form-item name="note" label="备注">
          <t-input v-model="addModelForm.note"></t-input>
        </t-form-item>
        <t-form-item name="image" label="图片">
          <t-upload accept="image/*" :action="BASE_URL+'/device/image'" :headers="uploadHeaders"
                    name="image" :request-method="addImage" :before-upload="beforeUploadHandler"
                    @remove="closeModelDialogHandler">
            <t-button theme="default">上传图片</t-button>
          </t-upload>
        </t-form-item>
        <t-form-item>
          <div class="flex justify-end w-full">
            <t-button class="mr-2" theme="default" @click="addModelVisible=false">取消</t-button>
            <t-button type="submit">添加</t-button>
          </div>
        </t-form-item>
      </t-form>
    </t-dialog>

  </div>
</template>

<style scoped lang="less">

</style>
