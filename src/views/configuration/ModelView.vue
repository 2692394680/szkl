<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ConfigurationApi } from '@/api/configuration_api'
import { TABLE_COLUMNS } from '@/views/configuration/constants/model_constants'
import { MessagePlugin } from 'tdesign-vue-next'
import { getIndexStore } from '@/store/index_store'
import { cloneDeep } from 'lodash'

const indexStore = getIndexStore()
const configurationApi = new ConfigurationApi()
const tableData = ref([])
const tablePagination = reactive({
  defaultCurrent: 1,
  defaultPageSize: 8,
  total: 0
})
// 对话框状态
const modelVisible = ref(false)
const modelType = ref('添加组态')
// 组态表单数据
const modelForm = reactive({
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

// 打开新增组态对话框
function openModelDialog() {
  // router.push('Design')
  modelVisible.value = true
  modelType.value = '添加组态'
}

// 打开编辑组态对话框
function editModelDialog(row) {
  modelForm.name = cloneDeep(row).name
  modelForm.image = cloneDeep(row).image
  modelForm.deviceId = cloneDeep(row).deviceId
  modelForm.note = cloneDeep(row).note
  modelVisible.value = true
  modelType.value = '编辑组态'
}

// 关闭新增组态对话框
function closeModelDialog() {
  if (modelForm.image) {
    deleteImage()
    modelForm.image = ''
  }
}

// 表格排序
function sortChange() {
  sort.descending = !sort.descending
  getList()
}

// 上传图片之前
function beforeUpload(e) {
  if (!modelForm.deviceId) {
    MessagePlugin.warning('设备ID不能为空')
    return false
  }
}

// 上传图片
function addImage(file) {
  const form = new FormData()
  form.append('image', file.raw)
  form.append('deviceId', modelForm.deviceId)
  return new Promise(resolve => {
    file.percent = 0
    configurationApi.addImage(form).then((res: any) => {
      modelForm.image = res.value
      resolve({
        status: 'success',
        response: { url: res.value }
      })
      MessagePlugin.success('上传成功')
      file.percent = 100
    })
  })
}

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

// 添加/编辑组态
async function changeModel(event) {
  if (typeof event.validateResult === 'object') return
  if (modelType.value === '添加组态') {
    await addModel()
  } else {
    await editModel()
  }
  await MessagePlugin.success(modelType.value + '成功')
  await getList()
  modelVisible.value = false
}

// 添加模型组态
async function addModel() {
  const file = new File([JSON.stringify([{}])], modelForm.name + '.json', {
    type: 'application/json',
    lastModified: Date.now()
  })
  const formData = new FormData()
  formData.append('model', file)
  await configurationApi.add(modelForm, formData)

  // await router.push('Design')
}

// 编辑模型组态
async function editModel() {
  await configurationApi.edit(modelForm)
}

// 删除图片
async function deleteImage() {
  await configurationApi.deleteImage({ path: modelForm.image })
  console.log('删除了图片')
}

// 禁用设备
async function disableModel(id) {
  await configurationApi.disable({ modelId: id })
  await getList()
  await MessagePlugin.success('禁用组态')
}

// 启用设备
async function enableModel(id) {
  await configurationApi.enable({ modelId: id })
  await getList()
  await MessagePlugin.success('启用组态')
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
      <template #image="{row}">
        <img class="thumbnail" :src="row.image" alt="">
      </template>
      <template #url="{row}">
        <t-tooltip :content="row.url" theme="light">
          <p class="text-blue-700 cursor-pointer copy" @click="indexStore.copyHandle(row.url)">
            点击复制</p>
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
      <template #op="{row}">
        <div class="cursor-pointer text-blue-700">
          <a class=" mr-4">组态</a>
          <a class=" mr-4" @click="editModelDialog(row)">编辑</a>
          <t-popconfirm content="确定禁用吗？该操作会导致该组态失效！" theme="danger"
                        @confirm="disableModel(row.id)">
            <a class="text-red-600 mr-4" v-show="state===0">禁用</a>
          </t-popconfirm>
          <a class="mr-4" v-show="state===1" @click="enableModel(row.id)">启用</a>
        </div>
      </template>
    </t-table>

    <t-dialog v-model:visible="modelVisible" :footer="false" @close="closeModelDialog">
      <t-form :data="modelForm" :rules="addModelRules" @submit="changeModel">
        <t-form-item labelWidth="0">
          <div class="text-2xl">{{ modelType }}</div>
        </t-form-item>
        <t-form-item name="name" label="组态名称">
          <t-input v-model="modelForm.name"></t-input>
        </t-form-item>
        <t-form-item name="deviceId" label="绑定设备ID">
          <t-input v-model="modelForm.deviceId"></t-input>
        </t-form-item>
        <t-form-item name="note" label="备注">
          <t-input v-model="modelForm.note"></t-input>
        </t-form-item>
        <t-form-item name="image" label="图片">
          <div class="flex flex-col">
            <img class="thumbnail" :src="modelForm.image" alt="" v-if="modelForm.image">
            <t-upload accept="image/*" name="image" :request-method="addImage" :before-upload="beforeUpload"
                      @remove="closeModelDialog">
              <t-button theme="default">上传图片</t-button>
            </t-upload>
          </div>
        </t-form-item>
        <t-form-item>
          <div class="flex justify-end w-full">
            <t-button class="mr-2" theme="default" @click="modelVisible=false">取消</t-button>
            <t-button type="submit">确定</t-button>
          </div>
        </t-form-item>
      </t-form>
    </t-dialog>

  </div>
</template>

<style scoped lang="less">
.thumbnail{
  border-radius: 12px;
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
  object-fit: cover;
}
</style>
