import { defineStore } from 'pinia';
import instance from '@/utils/request';

export const useHomeStore = defineStore('home', {
  // 相当于 vue2 中的 data
  state: () => {
    return {
      money: 10000,
    };
  },
  // 相当于 vue2 中的 methods
  actions: {
    async getAllCategory() {
      const res = await instance.request({ url: '/home/category/head' });
      console.log('res -----> ', res);
    },
  },
});
