import type { CheckoutInfo } from '@/types';
import { http } from '@/utils/request';
import { defineStore } from 'pinia';

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
  },
});
