<script setup lang="ts">
</script>

<template>
  <div id="layout-content">
    <!--面包屑-->
    <t-breadcrumb class="mb-4" :maxItemWidth="'150'">
      <t-breadcrumbItem v-for="(item,index) in $route.matched" :key="index">
        {{ item.meta.title }}
      </t-breadcrumbItem>
    </t-breadcrumb>

    <div class="p-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="less">
#layout-content{
  margin: 20px;
  padding: 15px;
  background-color: #fff;
}
</style>
