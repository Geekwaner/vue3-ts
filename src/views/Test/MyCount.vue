<script setup lang="ts">
// 需求：
//   1. 显示标签和数量
//   2. 加号和最大值处理
//   3. 减号和最小值处理
//   4. props 默认值处理

// 父组件通过 modelValue 传值，那么子组件接收也是 modelValue
const {
  isLabel = true,
  modelValue,
  max = 20,
  min = 1,
} = defineProps<{
  isLabel?: boolean;
  modelValue: number;
  max?: number;
  min?: number;
}>();

// emit('update:modelValue',1)
const emit = defineEmits<{
  (event: 'update:modelValue', val: number): void;
}>();

const add = () => {
  // 最大值处理
  if (modelValue + 1 > max) return;
  // 没有超过最大值就调用 父组件的方法实现+1
  emit('update:modelValue', modelValue + 1);
};

// 减号和最小值
const reduce = () => {
  // 最小值处理
  if (modelValue - 1 < min) return;
  // 没有超过最大值就调用 父组件的方法实现-1
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
