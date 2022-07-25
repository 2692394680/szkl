<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { modelListGet } from '@/api/configuration_api'
import { MessagePlugin } from 'tdesign-vue-next'

const tableColumns = ref([
  {
    colKey: 'index',
    title: '组态名称',
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
    colKey: 'platform',
    title: '所属组织'
  },
  {
    colKey: 'type',
    title: '模型名称'
  },
  {
    colKey: 'default',
    title: '创建人'
  },
  {
    colKey: 'needed',
    title: '更新时间'
  },
  {
    colKey: 'detail.position',
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
  total: 28
})

const getModuleList = async() => {
  const result: any = modelListGet(tablePagination.defaultCurrent, tablePagination.defaultPageSize)
  console.log(result)
  if (result.code !== 200) {
    await MessagePlugin.error('模型组态获取失败')
    return
  }
  tableData.value = result.value.modules
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

    <t-table rowKey="index" :data="tableData" :cloumns="tableColumns" stripe bordered hover
             :pagination="tablePagination" table-layout="fixed"></t-table>
  </div>
</template>

<style scoped lang="less">

</style>
