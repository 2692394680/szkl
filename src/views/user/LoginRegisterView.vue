<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'

import UserLogin from '@/views/user/components/UserLogin.vue'
import UserRegister from '@/views/user/components/UserRegister.vue'
import UserPasswordReset from '@/views/user/components/UserPasswordReset.vue'
import {useRoute, useRouter} from "vue-router";

//修复： 防止/loginRegister,/后面乱传参导致页面异常问题(history模式)
const type = useRoute().params.type || null
console.log(type)
if (type != "register" && type != "login") {
  useRouter().push({
    name: 'LoginRegister',
    params: {
      type: 'login'
    }
  })
}
</script>

<template>
  <div id="login-register">
    <div class="cursor-pointer text-white absolute top-5 left-5 flex justify-between items-center"
         @click="$router.push('/')">
      <SvgIcon icon-name="icon-arrow-left-s-line" size="1.8em"></SvgIcon>
      <span>回到首页</span>
    </div>
    <div class="left text-5xl cursor-pointer" @click="$router.push('/')">深圳科链工业物联网平台</div>
    <div class="right">
      <UserLogin v-if="$route.params.type==='login'"></UserLogin>
      <UserRegister v-if="$route.params.type==='register'"></UserRegister>
      <UserPasswordReset v-if="$route.params.type==='password'"></UserPasswordReset>
    </div>
  </div>
</template>

<style scoped lang="less">
#login-register {
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/background/pexels-aboodi-vesakaran-12318371.jpg');
  background-size: cover;
  position: fixed;
  background-position: center;
  background-repeat: no-repeat;
}

.left {
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(0, -50%);
  color: #ffffff;
}

.right {
  position: absolute;
  top: 50%;
  left: 60%;
  width: 400px;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid #F8F8F8;
  transform: translate(0, -50%);
}
</style>
