import { message } from '@/components/XtxUI';
import type { CartList } from '@/types';
import { http } from '@/utils/request';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  // 状态
  state: () => ({
    // 购物车列表
    list: [] as CartList,
  }),
  // 计算
  getters: {
    // 有效商品的列表计算
    // 1.  isEffective 为真 2. 商品还有库存
    effectiveList(): CartList {
      return this.list.filter((v) => v.isEffective && v.stock > 0);
    },

    // 计算有效商品的数量
    effectiveListCount() {
      // 写法1，保证业务实现
      let sum = 0;
      this.effectiveList.forEach((v) => (sum += v.count));
      return sum;
    },
    // 有效商品总价格
    effectiveListPrice() {
      // 写法1，保证业务实现
      let sum = 0;
      this.effectiveList.forEach((v) => (sum += Number(v.nowPrice) * v.count));
      return sum;
    },
  },
  // 方法
  actions: {
    // 加入购物车
    async addCart(data: object) {
      const res = await http('post', '/member/cart', data);
      message({ type: 'success', text: '添加购物车成功' });
      // 修改完购物车后，一定要记得获取最新的购物车数据
      this.getCartList();
    },
    // 获取购物车列表
    async getCartList() {
      const res = await http<CartList>('get', '/member/cart');
      this.list = res.data.result;
    },
  },
});
