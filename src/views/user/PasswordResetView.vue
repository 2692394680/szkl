<script setup lang="ts">
import UserPasswordReset from '@/views/user/components/UserPasswordReset.vue'
import UserHeader from '@/views/user/components/UserHeader.vue'
</script>

<template>
  <UserHeader></UserHeader>
  <div class="mt-10 w-1/3">
    <div class="text-xl mb-4">重置密码</div>
    <UserPasswordReset></UserPasswordReset>
  </div>
</template>

<style scoped lang="less">

</style>
