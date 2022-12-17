<script setup lang="ts"></script>

<template>
  <ul>
    <li>
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li>
      <RouterLink to="/login">登录页</RouterLink>
    </li>
  </ul>
  <!-- 觉得放出路由出口 -->
  <RouterView></RouterView>
</template>

<style lang="less" scoped></style>
