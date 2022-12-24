import { message } from '@/components/XtxUI';
import type { CartItem, CartList } from '@/types';
import { http } from '@/utils/request';
import { defineStore } from 'pinia';
import { useMemberStore } from './member';

// ❌  失败，因为它是在创建 pinia 之前调用的
// const member = useMemberStore();

export const useCartStore = defineStore('cart', {
  persist: true,
  // 状态
  state: () => ({
    // 购物车列表
    list: [] as CartList,
  }),
  // 计算
  getters: {
    isLogin() {
      const member = useMemberStore();
      return member.isLogin;
    },
    // 是否全选
    isAllSelected(): boolean {
      return (
        this.effectiveList.length > 0 &&
        this.effectiveList.every((v) => v.selected)
      );
    },
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

    // 已选择商品列表
    selectedList(): CartList {
      return this.effectiveList.filter((v) => v.selected);
    },
    // 已选择商品的数量
    selectedListCount(): number {
      return this.selectedList.reduce((sum, item) => sum + item.count, 0);
    },
    // 已选择商品的价格
    selectedListPrice(): string {
      return this.selectedList
        .reduce((sum, item) => sum + Number(item.nowPrice) * item.count, 0)
        .toFixed(2);
    },
  },
  // 方法
  actions: {
    // 清空购物车
    clearCart() {
      this.list = [] as CartList;
    },
    // 删除购物车商品
    async deleteCart(data: { ids: string[] }) {
      if (this.isLogin) {
        // { ids: [ skuId1,skuId2 ] }
        const res = await http('delete', '/member/cart', data);
        this.getCartList();
      } else {
        // console.log('data -----> ', data);  ----> { ids: ['300485153'] }
        this.list = this.list.filter((v) => v.skuId !== data.ids[0]);
      }

      message({ type: 'success', text: '删除成功' });
    },
    // 加入购物车
    async addCart(data: CartItem) {
      if (this.isLogin) {
        const res = await http('post', '/member/cart', {
          count: data.count,
          skuId: data.skuId,
        });
        // 修改完购物车后，一定要记得获取最新的购物车数据
        this.getCartList();
      } else {
        // 如果已经有相同的商品规格，那么添加数量即可，否则就添加一条数据
        const cartItem = this.list.find((v) => v.skuId === data.skuId);
        if (cartItem) {
          // 有就把数量相加
          cartItem.count += data.count;
        } else {
          // 没有的话，就直接新增一条数据即可
          this.list.unshift(data);
        }
      }
      message({ type: 'success', text: '添加购物车成功~' });
    },
    // 获取购物车列表
    async getCartList() {
      if (this.isLogin) {
        const res = await http<CartList>('get', '/member/cart');
        this.list = res.data.result;
      } else {
        // 更新整个本地购物车，获取最新数据即可
        this.list.forEach(async (item) => {
          const res = await http<CartItem>('get', '/goods/stock/' + item.skuId);
          const { isEffective, stock, nowPrice } = res.data.result;
          item.isEffective = isEffective;
          item.stock = stock;
          item.nowPrice = nowPrice;
        });
      }
    },

    // 修改购物车状态
    async updateCart(
      skuId: string,
      data: { selected?: boolean; count?: number }
    ) {
      if (this.isLogin) {
        const res = await http('put', '/member/cart/' + skuId, data);
        this.getCartList();
      } else {
        // console.log('data -----> ', data);
        // 找到购物车 skuId 的商品
        const cartItem = this.list.find((v) => v.skuId === skuId);
        if (cartItem) {
          if (data.selected !== undefined) cartItem.selected = data.selected;
          if (data.count !== undefined) cartItem.count = data.count;
        }
      }

      message({ type: 'success', text: '修改成功~' });
    },

    // 购物车全选/反选
    async updateCartAllSelected(data: { selected: boolean }) {
      if (this.isLogin) {
        const res = await http('put', '/member/cart/selected', data);
        this.getCartList();
      } else {
        // console.log('data -----> ', data); ---- {selected: true}
        this.list.forEach((v) => (v.selected = data.selected));
      }
      message({ type: 'success', text: '修改购物车成功' });
    },
  },
});
