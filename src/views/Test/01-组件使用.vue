<script setup lang="ts">
/*
使用组件的三种方式：
1. 单个组件导入+使用(每个页面需要使用，都要引入)
2. 通过index.ts统一管理所有组件，通过import{组件1，组件2}使用
3. 通过app.use()全局注册使用(最简洁，目前所有ui库都这么实现)
*/

// 1. 单个组件导入+使用
// import Button from '../../components/XtxUI/Button/index.vue';
// import Skeleton from '../../components/XtxUI/Skeleton/Skeleton.vue';

// 2. 通过index.ts统一管理所有组件，通过import{组件1，组件2}使用
// import { XtxButton, XtxSkeleton } from '@/components/XtxUI';
</script>

<template>
  <h1>我是测试页面👍</h1>
  <!-- <Button size="large" type="primary">按钮</Button>
  <Button size="middle" type="gray">按钮</Button>
  <Skeleton></Skeleton>
  <Skeleton :width="200" :height="180" bg="pink"></Skeleton> -->
  <XtxButton size="middle" type="gray">按钮</XtxButton>
  <XtxSkeleton :width="200" :height="180" bg="pink"></XtxSkeleton>
</template>

<style lang="less" scoped></style>
