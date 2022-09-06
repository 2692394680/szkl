<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { getUserStore } from '@/store/modules/user_store'

const { userinfo } = storeToRefs(getUserStore())
</script>

<template>
  <div class="text-gray-800">
    <span class="text-xl">HI，{{ userinfo.name }}</span>
    <span> 下午好，欢迎回来 ~</span>
  </div>
  <t-divider></t-divider>
</template>

<style scoped lang="less">

</style>
