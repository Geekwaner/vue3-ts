<script setup lang="ts">
// import { onUpdated } from 'vue';
import { useRoute } from 'vue-router';

// this.$route
const route = useRoute();

// // 参数在 url 中通过 ? 方式传递的，用query
// // 其他参数使用 params
const { id } = route.params;
console.log('id -----> ', id);

// fullPath 和 path 区别： path仅包含路径，fullpath包含路径和参数
// fullPath        /category/1029487?username=zs&age=18
// path            /category/1029487

// // 动态id改变，组件其实没有被销毁，可以再 onUpdated 看到效果
// // 实际开发中，不会使用 onUpdated 来监听，代码量太多
// onUpdated(() => {
//   const { id } = route.params;
//   console.log('onUpdated -----> ', id);
// });
</script>

<template>
  <div class="top-category">
    <div class="container">顶级类目</div>
  </div>
</template>

<style scoped lang="less"></style>
