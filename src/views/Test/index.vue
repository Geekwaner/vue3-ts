<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';

/*
获取dom元素
1. 定义空 变量
2. 把变量 通过 ref 属性和 dom 关联起来
3. 页面渲染完之后，就可以使用了
*/

// 🔔核心单词解释：
//   useIntersectionObserver   检查元素是否进入可视区函数
//   target                    目标元素，🎯需配合模板 ref 使用
//   isIntersecting            是否进入可视区(布尔值)
//   stop                      用于停止检测的函数

// 官网基本案例，供同学练习复制
const useObserver = () => {
  const target = ref(null);
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    // 写业务代码
    console.log('isIntersecting目标是否进入可视区 -----> ', isIntersecting);
    if (isIntersecting) {
      console.log('目标进入了可视区，停止监听 ');
      // 实现业务代码
      stop();
    }
  });

  return { target };
};
const { target } = useObserver();
console.log('target -----> ', target);
// const fn = () => {
//   alert(123);
//   console.log('456 -----> ', 456);
//   const a = 1;
//   const b = 1;
//   return { a, b };
// };
// const { a } = fn();
// console.log('a -----> ', a);
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
