<script setup lang="ts">
// 直接import其实是已经引入了
// import MyButton from './MyButton.vue';

import { defineAsyncComponent } from 'vue';
import AsyncCom from './AsyncCom.vue';
// 异步加载组件，可以用到vue3的defineAsyncComponent
const TestCom = defineAsyncComponent(() => import('./MyButton.vue'));
</script>

<template>
  <h1>Hello vue3 + ts👍</h1>
  <!-- 不在 Suspense里面，没人去解开组件内的promise -->
  <!-- <AsyncCom></AsyncCom> -->
  <!-- Suspense可以给异步组件添加等待状态 -->
  <Suspense>
    <!-- 可以解开组件中的 promise  -->
    <div>
      <TestCom>异步加载的按钮</TestCom>
      <AsyncCom></AsyncCom>
    </div>

    <template #fallback>
      <h1>
        疯狂加载等待中...疯狂加载等待中...疯狂加载等待中...疯狂加载等待中...疯狂加载等待中...
      </h1>
    </template>
  </Suspense>
</template>

<style lang="less" scoped></style>
