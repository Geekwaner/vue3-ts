<script setup lang="ts">
// 直接import其实是已经引入了
// import MyButton from './MyButton.vue';

import { defineAsyncComponent } from 'vue';
// 异步加载组件，可以用到vue3的defineAsyncComponent
const TestCom = defineAsyncComponent(() => import('./MyButton.vue'));
</script>

<template>
  <h1>Hello vue3 + ts👍</h1>
  <!-- Suspense可以给异步组件添加等待状态 -->
  <Suspense>
    <TestCom>异步加载的按钮</TestCom>

    <template #fallback>
      <h1>
        疯狂加载等待中...疯狂加载等待中...疯狂加载等待中...疯狂加载等待中...疯狂加载等待中...
      </h1>
    </template>
  </Suspense>
</template>

<style lang="less" scoped></style>
