import { defineStore } from 'pinia';
import instance, { http } from '@/utils/request';
import type { BannerList, CategoryList, GoodsList } from '@/types';

// types 存放 ts 类型声明的文件夹
export const useHomeStore = defineStore('home', {
  // 开启数据本地持久化
  persist: true,
  // 高级用法，一般用不上
  // persist: {
  //   // 🎉按需持久化，默认会存储全部
  //   paths: ['categoryList', 'bannerList'],
  //   // 修改存储中使用的键名称，默认为当前 Store的 id
  //   key: 'bigHome',
  //   // 修改为 sessionStorage，默认为 localStorage
  //   storage: window.sessionStorage,
  // },
  // 相当于 vue2 中的 data
  state: () => {
    return {
      categoryList: [] as CategoryList,
      bannerList: [] as BannerList,
      newGoodsList: [] as GoodsList,
    };
  },
  // 相当于 vue2 中的 methods
  actions: {
    async getAllCategory() {
      /*
        终极目标，封装一个统一的http请求，方便维护管理，
        http<CategoryList>("GET", "/home/category/head",obj);

        1. 了解 为什么 通过泛型，可以把类型绑定到 res.data 上面
        2. 做 http 的封装
        3. 简化 传递的类型，其实也就是 result 的类型不确定而已
      */

      // 引进http请求，页面调用就简单的多了
      const res = await http<CategoryList>('get', '/home/category/head');
      this.categoryList = res.data.result;
    },
    // 获取轮播图数据
    async getBannerList() {
      const res = await http<BannerList>('get', '/home/banner');
      this.bannerList = res.data.result;
    },

    // 获取新鲜好物数据
    async getNewGoodsList() {
      const res = await http<GoodsList>('get', '/home/new', { limit: 4 });
      this.newGoodsList = res.data.result;
    },
  },
});
