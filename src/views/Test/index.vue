<script setup lang="tsx">
// import { onMounted, createVNode, h } from 'vue';

// onMounted(() => {
//   const h1DOM = document.querySelector('h1');
//   console.dir(h1DOM);
// });

// const DIVDOM = h('div', {}, '我是div标签');
// const VDOM = h('h1', { id: 'box', title: '虚拟title' }, [
//   h('div', {}, '我是div标签'),
//   h('div', {}, '我是div标签'),
//   DIVDOM,
// ]);

// const UL = h('ul', {}, [
//   h('li', {}, '111'),
//   h('li', {}, '222'),
//   h('li', {}, '333'),
//   h('li', {}, '444'),
// ]);
// console.dir(VDOM);

// jsx/tsx 允许我们在 js 中写 html 文档结构
const VDOM = () => (
  <h1 id="box" title="虚拟title">
    我是虚拟h1
  </h1>
);

const UL = () => (
  <ul>
    <li>111</li>
    <li>222</li>
    <li>333</li>
    <li>444</li>
  </ul>
);
</script>

<template>
  <h1>Hello vue3 + ts👍</h1>
  <VDOM />
  <UL></UL>
</template>

<style lang="less" scoped></style>
