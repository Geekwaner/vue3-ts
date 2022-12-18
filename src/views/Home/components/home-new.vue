<script setup lang="ts">
import { useHomeStore } from '@/store';
import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';
import HomePanel from './home-panel.vue';
const home = useHomeStore();
// home.getNewGoodsList();

const target = ref(null);
const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  // 写业务代码
  console.log('isIntersecting目标是否进入可视区 -----> ', isIntersecting);
  if (isIntersecting) {
    console.log('目标进入了可视区，停止监听 ');
    // 实现业务代码
    home.getNewGoodsList();
    stop();
  }
});
</script>

<template>
  <div style="height: 2000px"></div>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱" ref="target">
      <template #right><XtxMore path="/" /></template>
      <!-- 面板内容 -->
      <ul class="goods-list">
        <li v-for="item in home.newGoodsList" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
