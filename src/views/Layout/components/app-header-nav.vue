<script setup lang="ts">
import { useHomeStore } from '@/store';

const home = useHomeStore();
// console.log('home.m -----> ', home.money);
home.getAllCategory();
</script>

<template>
  <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <template v-if="home.categoryList.length">
      <li v-for="item in home.categoryList" :key="item.id">
        <a href="#">{{ item.name }}</a>
      </li>
    </template>
    <template v-else>
      <li v-for="item in 9" :key="item">
        <XtxSkeleton
          :width="30"
          :height="18"
          style="margin: 10px 0 0 -10px"
        ></XtxSkeleton>
      </li>
    </template>
  </ul>
</template>

<style lang="less" scoped>
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
  }
}
</style>
