<script setup lang="ts">
import { ref } from 'vue';
import MyButton from './MyButton.vue';
import MyCount from './MyCount.vue';
//

const modelValue = ref(10);
</script>

<template>
  <h1>我是测试页面👍</h1>
  <MyButton size="large" type="plain">按钮</MyButton>
  <MyButton size="middle">按钮</MyButton>

  <hr />
  <br />

  <!-- islabel 可以直接传属性名即可 -->
  <!-- 传数据使用 :modelValue -->
  <MyCount isLabel :modelValue="modelValue"></MyCount>
</template>

<style lang="less" scoped></style>
