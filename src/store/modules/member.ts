import type { Profile } from '@/types';
import { http } from '@/utils/request';
import { defineStore } from 'pinia';
// 🎯非 vue 组件，导入路由实例
import router from '@/router';
import { message } from '@/components/XtxUI';

// ❌常见错误，在非 setup 中使用 useRouter
// const router = useRouter();
console.log('router -----> ', router);
export const useMemberStore = defineStore('member', {
  // 开启本地数据持久化
  persist: true,
  // 相当于 data
  state: () => {
    return {
      profile: {} as Profile,
    };
  },
  // getters相当于 computed
  getters: {
    //  在getters中使用了this，需要定义返回类型（在 TypeScript 中）
    isLogin(): boolean {
      return Boolean(this.profile.token);
    },
  },
  // actions 相当于 methods
  actions: {
    // 退出登录
    logout() {
      this.profile = {} as Profile;
      message({ type: 'success', text: '退出登录成功' });
    },
    // 登录成功的操作
    loginSuccess() {
      // 🐛 在非 .vue 组件中 useRoute() 返回 undefined，没法获取当前路由信息
      // 通过 router.currentRoute 拿到当前的路由对象即可
      const { target = '/' } = router.currentRoute.value.query;
      console.log('target -----> ', target);
      router.push(target as string);
      message({ type: 'success', text: '登录成功' });
    },
    // 类型可以直接写object即可
    async login(data: object) {
      const res = await http<Profile>('post', '/login', data);
      this.profile = res.data.result;
      // 登录成功的操作
      this.loginSuccess();
    },

    // 第三方登录绑定
    async loginSocialBind(data: object) {
      const res = await http<Profile>('POST', '/login/social/bind', data);
      //  绑定成功后，会返回用户信息
      this.profile = res.data.result;
      this.loginSuccess();
    },

    // 发送验证码请求
    async sentCode(data: object) {
      const res = await http('GET', '/login/social/code', data);
    },
  },
});

// 相当于导出了 { useMemberStore }
// 页面要引用 import { useMemberStore } from '路径'
