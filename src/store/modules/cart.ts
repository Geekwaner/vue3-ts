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
    effectiveListCount(): number {
      // 写法1，保证业务实现
      // let sum = 0;
      // this.effectiveList.forEach((v) => (sum += v.count));
      // return sum;

      /*
      reduce 对数组遍历，一般用来求和，
      简单来说，传入 总数 和 每一项，把每一项的值和总数相加，再返回，加到最后就是总和

      reduce( fn(初始值/上一次调用返回的数，item当前遍历的对象), 初始值)
      */
      return this.effectiveList.reduce((sum, item) => sum + item.count, 0);
    },
    // 有效商品总价格
    effectiveListPrice(): number {
      // 写法1，保证业务实现
      // let sum = 0;
      // this.effectiveList.forEach((v) => (sum += Number(v.nowPrice) * v.count));
      // return sum;
      return this.effectiveList.reduce(
        (sum, item) => sum + Number(item.nowPrice) * item.count,
        0
      );
    },
  },
  // 方法
  actions: {
    // 删除购物车商品
    async deleteCart(data: object) {
      // { ids: [ skuId1,skuId2 ] }
      const res = await http('delete', '/member/cart', data);
      message({ type: 'success', text: '删除购物车成功' });
      this.getCartList();
    },
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

    // 修改购物车状态
    async updateCart(skuId: string, data: object) {
      const res = await http('put', '/member/cart/' + skuId, data);
      message({ type: 'success', text: '修改购物车成功' });
      this.getCartList();
    },
  },
});
