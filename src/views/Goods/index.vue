<script setup lang="ts">
// 1. 怎么拿到当前路由对象 ---  useRoute()
// 2. 怎么拿到当前路由动态参数 --- params

import type { GoodsDetail } from '@/types';
import { http } from '@/utils/request';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

// vue2，通过 this.$route/this.$router获取到
// 因为在setup里面，没有 this，需要使用 useRoute()/useRouter()

const route = useRoute();
// console.log('route -----> ', route);
const { id } = route.params;
console.log('id -----> ', id);

// 建议定义时候不写值，否则需要把对象类型的属性都写完全，太费功夫，没必要
const goodsDetail = ref<GoodsDetail>();
// 不要再顶层直接使用 await 发请求，可以在 onMounted 里发送
onMounted(async () => {
  const res = await http<GoodsDetail>('GET', '/goods', { id });
  goodsDetail.value = res.data.result;
});
</script>

<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 图片预览区 -->
        <div class="media"></div>
        <!-- 商品信息区 -->
        <div class="spec"></div>
      </div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品详情 -->
          <div class="goods-tabs"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  margin-top: 20px;
}
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
