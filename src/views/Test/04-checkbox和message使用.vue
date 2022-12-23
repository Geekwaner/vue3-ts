<script setup lang="ts">
import { message } from '@/components/XtxUI';
import { ref } from 'vue';

const isAgree = ref(false);

const showMsg = () => {
  message({ text: '当前选中' + isAgree.value, type: 'success', time: 2000 });
};
</script>

<template>
  <h1>Hello vue3 + ts👍</h1>
  <XtxCheckBox v-model="isAgree" @click="showMsg">我已同意霸王条款</XtxCheckBox>
</template>

<style lang="less" scoped></style>
