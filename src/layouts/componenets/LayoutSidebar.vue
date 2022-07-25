<script setup lang="ts">
import { computed, ref } from 'vue'
import { asyncRouterList } from '@/router/index_router'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const menuExpanded = ref([route.path.substring(0, route.path.lastIndexOf('/'))])

const menuList = computed(() => {
  return asyncRouterList.filter(item => item.meta && item.meta.hidden !== true)
})

function menuChange(e) {
  router.push(e)
}

</script>

<template>
  <div id="sidebar">
    <t-menu :default-value="$route.path" :expanded="menuExpanded" @expand="menuExpanded = $event"
            @change="menuChange">
      <t-menu-item value="0">
        <template #icon>
          <t-icon name="app"/>
        </template>
        仪表盘
      </t-menu-item>
      <t-submenu :title="item.meta.title" :value="item.path" v-for="(item,index) in menuList" :key="index">
        <template #icon>
          <t-icon name="app"/>
        </template>
        <t-menu-item :value="item.path+'/'+item2.path" v-for="(item2,index2) in item.children" :key="index2">
          {{ item2.meta?.title }}
        </t-menu-item>
      </t-submenu>
    </t-menu>
  </div>
</template>

<style scoped lang="less">
#sidebar {
  height: calc(100vh - 64px);
}
</style>
