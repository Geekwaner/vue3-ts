<script setup lang="ts">
// 步骤：
// 1. 准备静态结构
// 2. 分析按钮组件的自定义属性
// 3. `defineProps` 定义 Props 接收值
// 4. 模板中使用父组件传过来的值设置按钮样式

// import type { PropType } from 'vue';

// defineProps({
//   size: {
//     // vue的类型，需要传递构造器
//     type: String,
//     default: 'middle',
//   },
//   type: {
//     type: String,
//   },
// });
// vue3里面，需要用泛型封装，才能更好的提供 ts 的保护

// 添加默认值
// 方案1：响应性语法糖(实验性)写法 `Vue` 版本要求 `vue@3.2.25+`
// 🚨 需修改配置后才能使用：
//      1. vite.config.ts   开启响应性语法糖(实验性)，记得重启项目
//      2. .eslintrc.cjs    关闭检查规则
// 注意：实验性写法在 启动项目 时会有警告提醒，我们知道自己在干什么，忽略警告即可
// const { size = 'large', type = 'gray' } = defineProps<{
//   // ts 的类型，小写即可
//   size?: 'large' | 'middle' | 'small' | 'mini';
//   type?: 'default' | 'primary' | 'plain' | 'gray';
// }>();

// 写法2 Proptype 写法 - 了解即可
// defineProps({
//   size: {
//     type: String as PropType<'large' | 'middle' | 'small' | 'mini'>,
//     default: 'small',
//   },
//   type: {
//     type: String as PropType<'default' | 'primary' | 'plain' | 'gray'>,
//     default: 'gray',
//   },
// });

// 写法3 withDefaults 写法 -了解即可
withDefaults(
  defineProps<{
    size?: 'large' | 'middle' | 'small' | 'mini';
    type?: 'default' | 'primary' | 'plain' | 'gray';
  }>(),
  {
    size: 'small',
    type: 'primary',
  }
);
</script>

<template>
  <button class="xtx-button ellipsis" :class="`${size} ${type}`">
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
