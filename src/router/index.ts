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
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
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
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
});

export default router;
