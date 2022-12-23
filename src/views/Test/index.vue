<script setup lang="ts">
//

import { ref, onUnmounted } from 'vue';

const count = ref(0);

// 配合 ts 设置0，定时器类型本质是数字
let timer = 0;
const start = (time = 60) => {
  // 一开始时候，就判断，有定时器，就不要执行后面的代码了
  if (count.value) return;

  count.value = time;
  timer = setInterval(() => {
    count.value--;
    console.log('count.value -----> ', count.value);

    // 到0时，清理定时器
    if (count.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
};

// 优化：离开页面时，清理定时器
onUnmounted(() => clearInterval(timer));
</script>

<template>
  <h1>Hello vue3 + ts👍</h1>
  <!-- start函数记得要调用，否则vue3会自动调用，并且传递当前对象，参数就不对了 -->
  <button @click="start(50)">{{ count === 0 ? '发送验证码' : count }}</button>
</template>

<style lang="less" scoped></style>
