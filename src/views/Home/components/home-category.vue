<script setup lang="ts">
// ctrl + p 可以在 vscode 通过文件名定位到文件

import { useHomeStore } from '@/store';

// 发送了3个相同的请求，其实没影响，我们封装组件，一定要保证组件功能的完整性
const home = useHomeStore();

home.getAllCategory();
</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in home.categoryList" :key="item.id">
        <RouterLink to="/">{{ item.name }}</RouterLink>
        <!-- 二级分类 -->
        <!--
          1. 可选链操作符
          2. 判断也行
         -->
        <!-- <RouterLink to="/" v-if="item.children[0]">{{
          item.children[0].name
        }}</RouterLink>
        <RouterLink to="/">{{ item.children?.[1]?.name }}</RouterLink> -->
        <!--
          vue3 中， v-if 的优先级，会比 v-for 更高
          vue2 中， vfor 的优先级，会比 v-if 更高
          无论在 vue2 或者 vue3，都不建议写在一起
          使用 template，可以理解为空标签，不会生成真正的dom，常用于 v-if/v-for，v-slot 渲染
         -->
        <template v-for="(item2, index) in item.children" :key="item2.id">
          <RouterLink to="/" v-if="index < 2">{{ item2.name }}</RouterLink>
        </template>
        <!-- 弹层layer位置 -->
        <div class="layer">
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="goods in item.goods" :key="goods.id">
              <RouterLink to="/">
                <img :src="goods.picture" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">
                    {{ goods.name }}
                  </p>
                  <p class="desc ellipsis">{{ goods.desc }}</p>
                  <p class="price"><i>¥</i>{{ goods.price }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;
      &:hover {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
      .layer {
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 1);
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;
        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;
          small {
            font-size: 16px;
            color: #666;
          }
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 310px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;
            &:nth-child(3n) {
              margin-right: 0;
            }
            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;
              &:hover {
                background: #e3f9f4;
              }
              img {
                width: 95px;
                height: 95px;
              }
              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;
                .name {
                  font-size: 16px;
                  color: #666;
                }
                .desc {
                  color: #999;
                }
                .price {
                  font-size: 22px;
                  color: @priceColor;
                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>
