<script setup lang="ts">
import { useCheckoutStore } from '@/store';

const checkout = useCheckoutStore();
checkout.getCheckouInfo();
</script>

<template>
  <div>结算页面</div>
</template>
