<script setup lang="ts">
import LoginHeader from './components/login-header.vue';
import LoginFooter from './components/login-footer.vue';
import CallbackBind from './components/callback-bind.vue';
import CallbackRegister from './components/callback-register.vue';
import { ref } from 'vue';
// 1. 检查用户是否已登录
if (QC.Login.check()) {
  // 2. 获取 QQ 用户唯一标识 openId
  QC.Login.getMe((openId) => {
    console.log('🗝️openId', openId);
  });
  // 3. 获取用户资料
  QC.api('get_user_info').success((res: unknown) => {
    console.log('😀获取用户资料', res);
  });
}

const isBind = ref(true);
</script>

<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container">
    <nav class="tab">
      <a href="javascript:;" :class="{ active: isBind }" @click="isBind = true">
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a
        href="javascript:;"
        :class="{ active: !isBind }"
        @click="isBind = false"
      >
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content">
      <CallbackBind v-show="isBind"></CallbackBind>
      <CallbackRegister v-show="!isBind"></CallbackRegister>
    </div>
  </section>
  <LoginFooter />
</template>

<style scoped lang="less">
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
