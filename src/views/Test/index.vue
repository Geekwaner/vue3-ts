<script setup lang="ts">
import { onMounted, createVNode } from 'vue';

onMounted(() => {
  const h1DOM = document.querySelector('h1');
  console.dir(h1DOM);
});

const DIVDOM = createVNode('div', {}, '我是div标签');
const VDOM = createVNode('h1', { id: 'box', title: '虚拟title' }, [DIVDOM]);

const UL = createVNode('ul', {}, [
  createVNode('li', {}, '111'),
  createVNode('li', {}, '222'),
  createVNode('li', {}, '333'),
  createVNode('li', {}, '444'),
]);
console.dir(VDOM);
</script>

<template>
  <h1>Hello vue3 + ts👍</h1>
  <VDOM />
  <UL></UL>
</template>

<style lang="less" scoped></style>
