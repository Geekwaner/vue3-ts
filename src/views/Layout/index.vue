<script setup lang="ts">
import AppTopnav from './components/app-topnav.vue';
import AppHeader from './components/app-header.vue';
import AppFooter from './components/app-footer.vue';
import AppHeaderSticky from './components/app-header-sticky.vue';
</script>

<template>
  <!-- 模块1：页面顶部 -->
  <AppTopnav />
  <!-- 模块2：头部组件 -->
  <AppHeader />
  <!-- 模块2：顶部吸顶 -->
  <AppHeaderSticky></AppHeaderSticky>

  <!-- 一定要放出路由出口，并且写在这里 -->
  <RouterView :key="$route.fullPath"></RouterView>

  <!-- 模块3：页面底部 -->
  <AppFooter />
</template>

<style lang="less" scoped></style>
