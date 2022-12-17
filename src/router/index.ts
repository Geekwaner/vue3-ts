import { createRouter, createWebHashHistory } from 'vue-router';
const router = createRouter({
  /*
 常见错误
 1. createWebHashHistory，没有调用
 2. routes 常常写成了 routers
 3. component 常常写成了components
 */

  // 创建路由模式
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        { path: '/', component: () => import('@/views/Home/index.vue') },
      ],
    },
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
    },
  ],
});

export default router;
