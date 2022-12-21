import type { Profile } from '@/types';
import { http } from '@/utils/request';
import { defineStore } from 'pinia';
export const useMemberStore = defineStore('member', {
  // 相当于 data
  state: () => {
    return {
      profile: {} as Profile,
    };
  },
  // getters相当于 computed
  getters: {},
  // actions 相当于 methods
  actions: {
    // 类型可以直接写object即可
    async login(data: object) {
      const res = await http<Profile>('post', '/login', data);
      this.profile = res.data.result;
    },
  },
});

// 相当于导出了 { useMemberStore }
// 页面要引用 import { useMemberStore } from '路径'
