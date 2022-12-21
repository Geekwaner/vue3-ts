<script setup lang="ts">
import LoginForm from './components/login-form.vue';
import LoginHeader from './components/login-header.vue';
import LoginFooter from './components/login-footer.vue';
//
</script>

<template>
  <div class="page-login">
    <!-- 1. 头部 -->
    <LoginHeader></LoginHeader>
    <!-- 2. 主体登录区域 -->
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <LoginForm />
      </div>
    </section>
    <!-- 3. 底部 -->
    <LoginFooter></LoginFooter>
  </div>
</template>

<style scoped lang="less">
// 主体样式
.login-section {
  background: url(@/assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}
</style>
