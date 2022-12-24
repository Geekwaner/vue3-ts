<script setup lang="ts">
// 1. 怎么拿到当前路由对象 ---  useRoute()
// 2. 怎么拿到当前路由动态参数 --- params

import { message } from '@/components/XtxUI';
import type { SkuEmit } from '@/components/XtxUI/Sku/index.vue';
import { useCartStore } from '@/store';
import type { CartItem, GoodsDetail } from '@/types';
import { http } from '@/utils/request';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

// vue2，通过 this.$route/this.$router获取到
// 因为在setup里面，没有 this，需要使用 useRoute()/useRouter()

const route = useRoute();
// console.log('route -----> ', route);
const { id } = route.params;
// console.log('id -----> ', id);

// 建议定义时候不写值，否则需要把对象类型的属性都写完全，太费功夫，没必要
const goods = ref<GoodsDetail>();
// 不要再顶层直接使用 await 发请求，可以在 onMounted 里发送
onMounted(async () => {
  const res = await http<GoodsDetail>('GET', '/goods', { id });
  goods.value = res.data.result;
});

const skuId = ref('');
const attrsText = ref('');
// 商品规格改变时，会触发，并且穿回来具体的sku信息
const change = (val: SkuEmit) => {
  console.log('val -----> ', val);
  skuId.value = val.skuId;
  attrsText.value = val.specsText;
};

const cart = useCartStore();
const count = ref(1);
const addCart = () => {
  // 没有 skuId，提醒用户并退出函数
  if (!skuId.value) {
    message({ text: '请选择完整的商品信息' });
    return;
  }
  if (!goods.value) return;
  const cartItem = {
    // 第一部分：商品详情中有的
    id: goods.value.id, // 商品id
    name: goods.value.name, // 商品名称
    picture: goods.value.mainPictures[0], // 图片
    price: goods.value.oldPrice, // 旧价格
    nowPrice: goods.value.price, // 新价格
    stock: goods.value.inventory, // 库存
    // 第二部分：商品详情中没有的，自己通过响应式数据收集
    count: count.value,
    skuId: skuId.value,
    attrsText: attrsText.value, //商品规格文本
    // 第三部分：设置默认值即可
    selected: true, // 默认商品选中
    isEffective: true, // 默认商品有效
  } as CartItem;

  console.log('📌cartItem 数据终于准备完毕了', cartItem);

  cart.addCart(cartItem);
};
</script>

<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 商品信息 -->
      <!-- goods可能为undefined，所以ts有报错，可以使用可选链，或者在上级做 v-if='goods'判断 -->
      <div class="goods-info" v-if="goods">
        <div class="media">
          <!-- 图片预览区 -->
          <div class="goods-image">
            <!-- 图片预览组件 -->
            <XtxImageView :imageList="goods.mainPictures"></XtxImageView>
          </div>
          <!-- 统计数量,后台没返回数据,不做渲染 -->
          <ul class="goods-sales">
            <li>
              <p>销量人气</p>
              <p>100+</p>
              <p><i class="iconfont icon-task-filling"></i>销量人气</p>
            </li>
            <li>
              <p>商品评价</p>
              <p>200+</p>
              <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
            </li>
            <li>
              <p>收藏人气</p>
              <p>80+</p>
              <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
            </li>
            <li>
              <p>品牌信息</p>
              <p>90+</p>
              <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
            </li>
          </ul>
        </div>
        <!-- 商品信息区 -->
        <div class="spec">
          <!-- 商品主要信息 -->
          <div class="goods-main">
            <p class="g-name">{{ goods.name }}</p>
            <p class="g-desc">{{ goods.desc }}</p>
            <p class="g-desc">这是选中的商品规格</p>
            <p class="g-price">
              <span>{{ goods.price }}</span>
              <span>{{ goods.oldPrice }}</span>
            </p>
            <div class="g-service">
              <dl>
                <dt>促销</dt>
                <dd>12月好物放送，App领券购买直降120元</dd>
              </dl>
              <dl>
                <dt>配送</dt>
                <dd>至</dd>
                <dd>
                  <XtxCity />
                </dd>
              </dl>
              <dl>
                <dt>服务</dt>
                <dd>
                  <span>无忧退货</span>
                  <span>快速退款</span>
                  <span>免费包邮</span>
                  <a href="javascript:;">了解详情</a>
                </dd>
              </dl>
            </div>
          </div>
          <!-- 规格选择组件 -->
          <XtxSku :goods="goods" @change="change"></XtxSku>
          <!-- 数量选择组件 -->
          <XtxCount v-model="count" isLabel></XtxCount>
          <!-- 按钮组件 -->
          <XtxButton type="primary" style="margin-top: 10px" @click="addCart"
            >加入购物车</XtxButton
          >
        </div>
      </div>
      <div class="goods-info Xtxloading" v-else></div>
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

// 商品信息
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
// 一定要写在后面，保证样式生效
.Xtxloading {
  background: #fff url('@/assets/images/loading.gif') no-repeat center;
}

// 图片预览区
.goods-image {
  width: 480px;
  height: 400px;
  background-color: #eee;
}

// 统计数量
.goods-sales {
  display: flex;
  width: 400px;
  align-items: center;
  text-align: center;
  height: 140px;
  li {
    flex: 1;
    position: relative;
    ~ li::after {
      position: absolute;
      top: 10px;
      left: 0;
      height: 60px;
      border-left: 1px solid #e4e4e4;
      content: '';
    }
    p {
      &:first-child {
        color: #999;
      }
      &:nth-child(2) {
        color: @priceColor;
        margin-top: 10px;
      }
      &:last-child {
        color: #666;
        margin-top: 10px;
        i {
          color: @xtxColor;
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
          cursor: pointer;
        }
      }
    }
  }
}

// 商品信息区
.spec {
  .g-name {
    font-size: 22px;
  }
  .g-desc {
    color: #999;
    margin-top: 10px;
  }
  .g-price {
    margin-top: 10px;
    span {
      &::before {
        content: '¥';
        font-size: 14px;
      }
      &:first-child {
        color: @priceColor;
        margin-right: 10px;
        font-size: 22px;
      }
      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }
  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;
    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;
      dt {
        width: 50px;
        color: #999;
      }
      dd {
        color: #666;
        &:last-child {
          span {
            margin-right: 10px;
            &::before {
              content: '•';
              color: @xtxColor;
              margin-right: 2px;
            }
          }
          a {
            color: @xtxColor;
          }
        }
      }
    }
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
