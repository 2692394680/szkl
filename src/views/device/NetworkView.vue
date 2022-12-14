<script setup lang="ts">
import { TABLE_COLUMNS } from '@/views/device/constants/nework_constants'
import { onMounted, reactive, ref } from 'vue'
import { DeviceApi } from '@/api/device_api'
import { MessagePlugin } from 'tdesign-vue-next'
import { cloneDeep } from 'lodash'
import { useRouter } from 'vue-router'
import { getIndexStore } from '@/store/index_store'
import moment from 'moment'

const router = useRouter()
const indexStore = getIndexStore()
const deviceApi = new DeviceApi()
const deviceList = ref([])
const tablePagination = reactive({
  defaultCurrent: 1,
  defaultPageSize: 8,
  total: 0
})
const sort = reactive({ sortBy: 'createTime', descending: false })

// 黑白名单状态
const state = ref(0)
// 对话框状态 1添加设备 2编辑设备
const deviceVisible = ref(false)
const deviceType = ref('添加设备')
// 设备表单
const deviceForm = reactive({
  deviceId: '',
  name: '',
  note: '',
  sn: '',
  mac: '',
  image: 'http://dummyimage.com/400x400',
  location: '',
  brand: '',
  isDelete: 0
})

const toUserVisible = ref(false)
const addDeviceRules = {
  name: [{ required: true }],
  sn: [{ required: true }],
  mac: [{ required: true }],
  location: [{ required: true }],
  brand: [{ required: true }],
  note: [{ required: true }],
  image: [{ required: true }]
}

// 添加设备按钮回调
function addDeviceDialog() {
  Object.keys(deviceForm).forEach(key => (deviceForm[key] = ''))
  deviceVisible.value = true
  deviceType.value = '添加设备'
}

// 编辑设备按钮回调
function updateDeviceDialog(row) {
  const value = cloneDeep(row)
  deviceForm.deviceId = value.id
  deviceForm.name = value.name
  deviceForm.note = value.note
  deviceForm.sn = value.sn
  deviceForm.mac = value.mac
  deviceForm.image = value.image
  deviceForm.location = value.location
  deviceForm.brand = value.brand
  deviceVisible.value = true
  deviceType.value = '编辑设备'
}

// 获取设备列表
async function getList() {
  const result: any = await deviceApi.list({
    pageSize: tablePagination.defaultPageSize,
    current: tablePagination.defaultCurrent,
    isDelete: state.value,
    sort: sort.descending
  })
  deviceList.value = result.value.records
  tablePagination.total = deviceList.value.length
}

// 添加/编辑设备
async function changeDevice(event) {
  Object.assign(deviceForm)
  if (typeof event.validateResult === 'object') return
  if (deviceType.value === '添加设备') {
    await deviceApi.add(deviceForm)
  } else {
    await deviceApi.update(deviceForm)
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

// 上传图片
function addImage(file) {
  const form = new FormData()
  form.append('image', file.raw)
  return new Promise(resolve => {
    file.percent = 0
    deviceApi.addImage(form).then((res: any) => {
      deviceForm.image = res.value
      resolve({
        status: 'success',
        response: { url: res.value }
      })
      MessagePlugin.success('上传成功')
      file.percent = 100
    })
  })
}

// 删除图片
async function deleteImage() {
  await deviceApi.deleteImage({ path: deviceForm.image })
  console.log('删除了图片')
}

// 前往子用户页面
function changeToUser(id) {
  // toUserVisible.value = true
  router.push('/user/sub-user?id=' + id)
}

function changeToRecord(id) {
  router.push('/device/record?id=' + id)
}

function sortChange() {
  sort.descending = !sort.descending
  getList()
}

// 关闭新增组态对话框
function closeDeviceDialog() {
  if (deviceForm.image) {
    deleteImage()
    deviceForm.image = ''
  }
}

onMounted(() => {
  moment.locale('zh-CN')
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
        <div class="text-gray-500">
          拥有权设备
        </div>
      </div>
      <div>
        <t-button @click="addDeviceDialog">添加设备</t-button>
      </div>
    </div>

    <t-table row-key="id" :data="deviceList" :columns="TABLE_COLUMNS" stripe bordered hover
             table-layout="auto" :sort="sort"
             :pagination="tablePagination" @sortChange="sortChange">
      <template #id="{row}">
        <t-tooltip content="点击复制" theme="light">
          <p class="cursor-pointer copy" @click="indexStore.copyHandle(row.id)">{{row.id}}</p>
        </t-tooltip>
      </template>
      <template #image="{row}">
        <img class="thumbnail" :src="row.image" alt="">
      </template>
      <template #createTime="{row}">
        {{ formatDate(row.createTime)}}
      </template>
      <template #op="{row}">
        <div class="cursor-pointer text-blue-700">
          <a class=" mr-4" @click="updateDeviceDialog(row)">编辑</a>
          <t-popconfirm content="确定禁用吗？该操作会导致该设备失效！" theme="danger"
                        @confirm="disableDevice(row.id)">
            <a class="text-red-600 mr-4" v-show="state===0">禁用</a>
          </t-popconfirm>
          <a class="mr-4" v-show="state===1" @click="enableDevice(row.id)">启用</a>
          <a class="mr-4" @click="changeToUser(row.id)">授权</a>
          <a @click="changeToRecord(row.id)">记录</a>
        </div>
      </template>
    </t-table>

    <!--添加设备-->
    <t-dialog v-model:visible="deviceVisible" :destroyOnClose="true" :footer="false">
      <t-form :data="deviceForm" label-align="left" @submit="changeDevice" @close="closeDeviceDialog"
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
        <t-form-item name="image" label="图片">
          <div class="flex flex-col">
            <img class="thumbnail" :src="deviceForm.image" alt="" v-if="deviceForm.image">
            <t-upload accept="image/*" name="image" :request-method="addImage" @remove="closeDeviceDialog">
              <t-button theme="default">上传图片</t-button>
            </t-upload>
          </div>
        </t-form-item>
        <t-form-item>
          <div class="flex justify-end w-full">
            <t-button class="mr-4" theme="default" variant="base" type="reset">重置</t-button>
            <t-button type="submit">{{ deviceType }}</t-button>
          </div>
        </t-form-item>
      </t-form>
    </t-dialog>

    <!--授权设备-->
    <t-dialog v-model:visible="toUserVisible" :destoryOnClose="true" :footer="false">
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
