import { defineStore } from 'pinia';
import instance from '@/utils/request';
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
      const res = await instance.request({ url: '/home/category/head' });
      this.categoryList = res.data.result;
    },
  },
});
