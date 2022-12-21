import { defineStore } from 'pinia';
export const useMemberStore = defineStore('member', {
  // 相当于 data
  state: () => {
    return {};
  },
  // getters相当于 computed
  getters: {},
  // actions 相当于 methods
  actions: {},
});

// 相当于导出了 { useMemberStore }
// 页面要引用 import { useMemberStore } from '路径'
