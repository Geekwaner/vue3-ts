<script setup lang="ts">
import instance from './utils/request';

const getList = async () => {
  const res = await instance.request({
    url: '/home/index',
  });
  console.log('res -----> ', res);
};
getList();
</script>

<template>
  <h1>Hello vue3 + ts👍</h1>
</template>

<style lang="less" scoped></style>
