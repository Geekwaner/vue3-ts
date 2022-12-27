import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/Layout/index.vue'),
    children: [
      // 子路由匹配规则:
      // 如果使用 / 开头，说明我这个路由就是根路径，不会把父组件的路径添加进来
      // 如果没有 / 开头，就会把父组件的 路径自动添加 ：  path:'test'  ---  '/test'
      { path: '', component: () => import('@/views/Home/index.vue') },
      {
        path: '/category/:id',
        component: () => import('@/views/Category/index.vue'),
      },
      {
        path: '/goods/:id',
        component: () => import('@/views/Goods/index.vue'),
      },
      {
        path: '/cart',
        component: () => import('@/views/Cart/index.vue'),
      },
      {
        // 注意路由的命名，/member/* 代表用户需要登录才能访问
        path: '/member/checkout',
        component: () => import('@/views/Checkout/index.vue'),
      },
      {
        path: '/member/pay',
        component: () => import('@/views/Pay/index.vue'),
      },
      {
        path: '/member/pay/callback',
        component: () => import('@/views/Pay/callback.vue'),
      },
      {
        path: '/member',
        component: () => import('@/views/Member/Layout/index.vue'),
        children: [
          {
            path: '',
            component: () => import('@/views/Member/Home/index.vue'),
          },
          {
            path: 'order',
            component: () => import('@/views/Member/Order/index.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/login/callback',
    component: () => import('@/views/Login/callback.vue'),
  },
  {
    path: '/test',
    component: () => import('@/views/Test/index.vue'),
  },
];

const router = createRouter({
  /*
 常见错误
 1. createWebHashHistory，没有调用
 2. routes 常常写成了 routers
 3. component 常常写成了components
 */

  // 创建路由模式
  history: createWebHashHistory(),
  routes,
  // 路由的滚动行为
  scrollBehavior(to, from, savedPosition) {
    // // to 代表是前进到的页面，from 代表是来源页面
    // console.log('to -----> ', to);
    // console.log('from -----> ', from);
    // // 只能 由浏览器的后退/前进按钮触发，才会有 savedPosition
    // console.log('savedPosition -----> ', savedPosition);
    return { top: 0, behavior: 'smooth' };
  },
});

export default router;
