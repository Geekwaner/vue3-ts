import type { Profile } from '@/types';
import { http } from '@/utils/request';
import { defineStore } from 'pinia';
// 🎯非 vue 组件，导入路由实例
import router from '@/router';
import { message } from '@/components/XtxUI';

// ❌常见错误，在非 setup 中使用 useRouter
// const router = useRouter();
// console.log('router -----> ', router);
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
    // 登录成功的操作
    loginSuccess() {
      router.push('/');
      message({ type: 'success', text: '登录成功' });
    },
    // 类型可以直接写object即可
    async login(data: object) {
      const res = await http<Profile>('post', '/login', data);
      this.profile = res.data.result;
      // 登录成功的操作
      this.loginSuccess();
    },
  },
});

// 相当于导出了 { useMemberStore }
// 页面要引用 import { useMemberStore } from '路径'
