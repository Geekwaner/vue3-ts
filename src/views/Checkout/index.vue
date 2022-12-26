<script setup lang="ts">
import { useCheckoutStore } from '@/store';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { hideContact } from '@/utils';
const checkout = useCheckoutStore();
checkout.getCheckouInfo();

const { checkoutInfo } = storeToRefs(checkout);

/*
   订单结算页 - 收获地址渲染
   1. userAddresses 可能没有收货地址, 没有收货地址时候要切换显示信息
   2. 保证 currentAddress 至少是一个 {}, 可以通过计算返回
       return checkout.checkoutInfo?.userAddresses?.[0] || {};
   3. 渲染收获地址
   4. 补充： 地址可能有切换的效果，所以不要写死0，留下index
 */

// const currentAddress = checkout.checkoutInfo.userAddresses?.[0] || {};
// console.log('currentAddress -----> ', currentAddress);

// 切换收货地址，其实就是改下标
const index = ref(0);
// 使用计算属性，checkoutInfo数据回来了，currentAddress也可以更新，获取第一个收货地址或者{}
const currentAddress = computed(() => {
  return checkout.checkoutInfo.userAddresses?.[index.value] || {};
});

const visible = ref(false);
</script>

<template>
  <!--
    fixed 定位 会被祖先元素的 transform、perspective、filter 影响
    祖先元素 transform、perspective、filter 不为 none的时候
    fixed定位的参照物会是该祖先元素
   -->
  <div style="transform: translate(0)">
    <!--
    Teleport传送门, vue3 内置组件，
    to属性传入css选择器，例如这里的body，那么把 Teleport 里面元素传送到 body，父元素是 body
	  to传送到的结构需要提前准备，例如传递到#hahahaha,找不到这个dom会报错
    -->
    <Teleport to="body">
      <XtxDialog
        title="收货地址弹出框"
        :visible="visible"
        @close="visible = false"
      >
        <h1>默认插槽</h1>
        <template #footer>
          <XtxButton
            type="gray"
            style="margin-right: 20px"
            @click="visible = false"
          >
            取消
          </XtxButton>
          <XtxButton type="primary" @click="visible = false">确认</XtxButton>
        </template>
      </XtxDialog>
    </Teleport>
  </div>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem>填写订单</XtxBreadItem>
      </XtxBread>
      <div class="wrapper" v-if="checkoutInfo.goods">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <ul v-if="currentAddress.id">
                <li>
                  <span>收&ensp;货&ensp;人：</span>{{ currentAddress.receiver }}
                </li>
                <li>
                  <span>联系方式：</span
                  >{{ hideContact(currentAddress.contact) }}
                </li>
                <li><span>收货地址：</span>{{ currentAddress.address }}</li>
              </ul>
              <div class="none" v-else>您需要先添加收货地址才可提交订单。</div>
            </div>
            <div class="action">
              <XtxButton class="btn" @click="visible = true"
                >切换地址</XtxButton
              >
              <XtxButton class="btn">添加地址</XtxButton>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in checkoutInfo.goods" :key="item.skuId">
                <td>
                  <RouterLink :to="`/goods/${item.id}`" class="info">
                    <img :src="item.picture" alt="" />
                    <div class="right">
                      <p>{{ item.name }}</p>
                      <p>{{ item.attrsText }}</p>
                    </div>
                  </RouterLink>
                </td>
                <!--  顺序：实付单价，数量，小计总价，实付价格小计 -->
                <td>&yen;{{ item.payPrice }}</td>
                <td>{{ item.count }}</td>
                <td>&yen;{{ item.totalPrice }}</td>
                <td>&yen;{{ item.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;"
            >不限送货时间：周一至周日</a
          >
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color: #999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkoutInfo.summary.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkoutInfo.summary.totalPrice }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkoutInfo.summary.postFee }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">¥{{ checkoutInfo.summary.totalPayPrice }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <XtxButton type="primary">提交订单</XtxButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  background: #fff;
  padding: 0 20px;
  .box-title {
    font-size: 16px;
    font-weight: normal;
    padding-left: 10px;
    line-height: 70px;
    border-bottom: 1px solid #f5f5f5;
  }
  .box-body {
    padding: 20px 0;
  }
}
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
    .right {
      line-height: 24px;
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  &.active,
  &:hover {
    border-color: @xtxColor;
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
// 对话框地址列表
.xtx-dialog {
  .addressWrapper {
    max-height: 500px;
    overflow-y: auto;
  }
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
</style>
