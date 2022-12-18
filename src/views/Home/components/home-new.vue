<script setup lang="ts">
import { useObserver } from '@/hooks';
import { useHomeStore } from '@/store';
import HomePanel from './home-panel.vue';
const home = useHomeStore();
// 不要一进来就发请求，要请求懒加载
// home.getNewGoodsList();
// 这里只需要传递方法名就可以，不要调用,类似 document.addEventLister('click',fn)
const { target } = useObserver(home.getNewGoodsList);
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
