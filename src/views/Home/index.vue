<script setup lang="ts">
import HomeBanner from './components/home-banner.vue';
import HomeCategory from './components/home-category.vue';
import HomePanel from './components/home-panel.vue';
</script>

<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- banner轮播图 -->
        <HomeBanner />
      </div>
    </div>
    <HomePanel title="我是主标题" subTitle="我是副标题">
      <template #right> 我是右侧插槽 </template>
      <h1>我是默认插槽</h1>
      <div>多写几个也没问题</div>
      <p>默认插槽段落</p>
    </HomePanel>
  </div>
</template>

<style lang="less" scoped></style>
