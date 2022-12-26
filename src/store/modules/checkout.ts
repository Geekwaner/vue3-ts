import { message } from '@/components/XtxUI';
import type { CheckoutInfo, OrderDetail, SubmitCheckout } from '@/types';
import { http } from '@/utils/request';
import { defineStore } from 'pinia';
import { useCartStore } from './cart';
import router from '@/router';

export const useCheckoutStore = defineStore('checkout', {
  // 3种写法
  // 写法1
  // state() {
  //   return {};
  // },
  // 写法2
  // state: ()=> ({})
  // 写法3
  state: () => {
    return {
      checkoutInfo: {} as CheckoutInfo,
      orderDetail: {} as OrderDetail,
    };
  },

  getters: {},
  actions: {
    async getCheckouInfo() {
      const res = await http<CheckoutInfo>('get', '/member/order/pre');
      this.checkoutInfo = res.data.result;
    },

    // 生成订单
    async submitCheckout(data: object) {
      const res = await http<SubmitCheckout>('post', '/member/order', data);
      // 下单成功提示，和获取最新购物车数据
      message({ type: 'success', text: '下单成功~' });
      const cart = useCartStore();
      cart.getCartList();

      // 替换成订单支付页(无需后退回来)，传递订单id
      router.replace('/member/pay?orderId=' + res.data.result.id);
    },

    // 获取订单详情
    async getOrderDetail(orderId: string) {
      const res = await http<OrderDetail>('get', '/member/order/' + orderId);
      this.orderDetail = res.data.result;
    },
  },
});
