<script setup lang="ts">
import { useObserver } from '@/hooks';

const { target } = useObserver();
</script>

<template>
  <div style="height: 2000px"></div>
  <!-- 🎯目标元素需添加模板 ref  -->
  <div ref="target">
    <h1>🎯我是目标元素🎯</h1>
  </div>
  <div style="height: 2000px"></div>
</template>

<style lang="less" scoped></style>
