import { message } from '@/components/XtxUI';
import { http } from '@/utils/request';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  // 状态
  state: () => ({
    // 购物车列表
    list: [],
  }),
  // 计算
  getters: {},
  // 方法
  actions: {
    // 加入购物车
    async addCart(data: object) {
      const res = await http('post', '/member/cart', data);
      message({ type: 'success', text: '添加购物车成功' });
    },
  },
});
