import { message } from '@/components/XtxUI';
import type { CheckoutInfo } from '@/types';
import { http } from '@/utils/request';
import { defineStore } from 'pinia';
import { useCartStore } from './cart';

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
      const res = await http('post', '/member/order', data);
      // 下单成功提示，和获取最新购物车数据
      message({ type: 'success', text: '下单成功~' });
      const cart = useCartStore();
      cart.getCartList();
    },
  },
});
