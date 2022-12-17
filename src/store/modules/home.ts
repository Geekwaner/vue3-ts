import { defineStore } from 'pinia';
import instance, { http } from '@/utils/request';
import type { CategoryList } from '@/types';

// types 存放 ts 类型声明的文件夹
export const useHomeStore = defineStore('home', {
  // 相当于 vue2 中的 data
  state: () => {
    return {
      categoryList: [] as CategoryList,
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
  },
});
