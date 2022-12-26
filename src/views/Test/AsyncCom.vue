<script setup lang="ts">
import { http } from '@/utils/request';
// 如果在顶层发送了 await 请求，请保证祖先元素内有使用 Suspense
const res = await http('get', '/home/banner');
console.log('res -----> ', res);
</script>

<template>
  <h1>异步加载组件...👍</h1>
</template>

<style lang="less" scoped></style>
