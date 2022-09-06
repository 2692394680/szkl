<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>

<template>
  <t-layout>
    <t-header>
    <TheHeader></TheHeader>
    </t-header>
    <t-content>
      <div class="h-screen">
        欢迎页
      </div>
    </t-content>
    <t-footer>
      <TheFooter></TheFooter>
    </t-footer>
  </t-layout>
</template>

<style scoped lang="less">

</style>
