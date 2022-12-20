<script setup lang="ts">
// 步骤：
// 1. 准备静态结构
// 2. 分析按钮组件的自定义属性
// 3. `defineProps` 定义 Props 接收值
// 4. 模板中使用父组件传过来的值设置按钮样式
</script>

<template>
  <button class="xtx-button ellipsis" :class="`middle default`">
    <slot></slot>
  </button>
</template>

<style scoped lang="less">
// 基于类名定义一些和定制样式无关的样式
.xtx-button {
  appearance: none;
  border: none;
  outline: none;
  background: #fff;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
}
// ---------大小类名-------------
// 大
.large {
  width: 240px;
  height: 50px;
  font-size: 16px;
}
// 中
.middle {
  width: 180px;
  height: 50px;
  font-size: 16px;
}
// 小
.small {
  width: 100px;
  height: 32px;
}
//超小
.mini {
  width: 60px;
  height: 32px;
}

// ---------颜色类名----------
// 默认色
.default {
  border-color: #e4e4e4;
  color: #666;
}
// 确认
.primary {
  border-color: @xtxColor;
  background-color: @xtxColor;
  color: #fff;
}
// 普通
.plain {
  border-color: @xtxColor;
  color: @xtxColor;
  background-color: lighten(@xtxColor, 50%);
}
// 灰色
.gray {
  border-color: #ccc;
  background-color: #ccc;
  color: #fff;
}
</style>
