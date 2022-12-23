<script setup lang="ts">
import { useCounter } from '@/hooks';

const { count, start } = useCounter();
</script>

<template>
  <h1>Hello vue3 + ts👍</h1>
  <!-- start函数记得要调用，否则vue3会自动调用，并且传递当前对象，参数就不对了 -->
  <button @click="start(50)">{{ count === 0 ? '发送验证码' : count }}</button>
</template>

<style lang="less" scoped></style>
