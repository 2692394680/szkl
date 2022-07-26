<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { modelListGet } from '@/api/configuration_api'

const tableColumns = ref([
  {
    colKey: 'moduleId',
    title: '组态ID',
    // 对齐方式
    align: 'center',
    // 设置列类名
    className: 'custom-column-class-name',
    // 设置列属性
    attrs: {
      'data-id': 'first-column'
    }
  },
  {
    colKey: 'moduleName',
    title: '组态名称'
  }, {
    colKey: 'modulePath',
    title: '组态路径'
  }, {
    colKey: 'deviceId',
    title: '设备ID'
  }, {
    colKey: 'deviceMac',
    title: '设备MAC'
  },
  {
    colKey: 'userId',
    title: '创建人'
  },
  {
    colKey: 'createTime',
    title: '创建时间'
  },
  {
    colKey: 'op',
    title: '操作',
    /**
     * 1.内容超出时，是否显示省略号。值为 true，则浮层默认显示单元格内容；
     * 2.值类型为 Function 则自定义浮层显示内容；
     * 3.值类型为 Object，则自动透传属性到 Popup 组件。
     */
    ellipsis: true
  }
])
const tableData = ref([])
const tablePagination = reactive({
  defaultCurrent: 1,
  defaultPageSize: 8,
  total: 0
})

const getModuleList = async() => {
  const result: any = await modelListGet(tablePagination.defaultCurrent, tablePagination.defaultPageSize)
  tableData.value = result ? result.value.modules : []
  tablePagination.total = tableData.value.length
}

onMounted(() => {
  getModuleList()
})
</script>

<template>
  <div>
    <div class="flex justify-between mb-4">
      <div></div>
      <div>
        <t-button>新增组态</t-button>
      </div>
    </div>

    <t-table row-key="moduleId" :data="tableData" :columns="tableColumns" stripe bordered hover
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
