<script setup lang="ts">

</script>

<template>
  <div>
    <div class="mb-6">
      <span class="text-2xl mr-2">注册</span>
      <span class="text-gray-500 cursor-pointer" @click="$router.push('login')">登录</span>
    </div>
    <t-form>
      <t-form-item labelWidth="0">
        <t-input placeholder="请输入用户名" size="large"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0">
        <t-input placeholder="请输入密码" type="password" size="large"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0">
        <t-button size="large" block>注册</t-button>
      </t-form-item>
      <t-form-item labelWidth="0">
        <div class="flex justify-between w-full cursor-pointer text-gray-500">
          <span @click="$router.push('login')">已有账号？立即登录</span>
          <span>忘记密码</span>
        </div>
      </t-form-item>
    </t-form>
  </div>
</template>

<style scoped lang="less">

</style>
