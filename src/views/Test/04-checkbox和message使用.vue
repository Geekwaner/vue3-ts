<script setup lang="ts">
import { message } from '@/components/XtxUI';
import { ref } from 'vue';

const isAgree = ref(false);

const showMsg = () => {
  message({ text: 'å½åéä¸­' + isAgree.value, type: 'success', time: 2000 });
};
</script>

<template>
  <h1>Hello vue3 + tsð</h1>
  <XtxCheckBox v-model="isAgree" @click="showMsg">æå·²åæé¸çæ¡æ¬¾</XtxCheckBox>
</template>

<style lang="less" scoped></style>
