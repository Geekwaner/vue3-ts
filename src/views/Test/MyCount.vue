<script setup lang="ts">
// 需求：
//   1. 显示标签和数量
//   2. 加号和最大值处理
//   3. 减号和最小值处理
//   4. props 默认值处理

const {
  isLabel = true,
  modelValue,
  max = 15,
  min = 1,
} = defineProps<{
  isLabel?: boolean;
  modelValue: number;
  max?: number;
  min?: number;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', val: number): void;
}>();

const add = () => {
  if (modelValue + 1 > max) return;
  emit('update:modelValue', modelValue + 1);
};

const reduce = () => {
  if (modelValue - 1 < min) return;
  emit('update:modelValue', modelValue - 1);
};
</script>

<template>
  <div class="xtx-numbox">
    <div class="label" v-if="isLabel">数量</div>
    <div class="numbox">
      <a href="javascript:;" @click="reduce">-</a>
      <input type="text" readonly :value="modelValue" />
      <a href="javascript:;" @click="add">+</a>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
