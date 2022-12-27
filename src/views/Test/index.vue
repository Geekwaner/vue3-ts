<script setup lang="ts">
import { onMounted, createVNode } from 'vue';

onMounted(() => {
  const h1DOM = document.querySelector('h1');
  console.dir(h1DOM);
});

const DIVDOM = createVNode('div', {}, '我是div标签');
const VDOM = createVNode('h1', { id: 'box', title: '虚拟title' }, [
  DIVDOM,
  DIVDOM,
]);
console.dir(VDOM);
</script>

<template>
  <h1>Hello vue3 + ts👍</h1>
  <VDOM />
</template>

<style lang="less" scoped></style>
