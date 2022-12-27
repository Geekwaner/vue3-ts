import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import vueSetupExtend from 'vite-plugin-vue-setup-extend';

// https://vitejs.dev/config/
export default defineConfig({
  // 修改打包的默认路径，改成'./'
  base: './',
  // QQ三方登录的回调uri为：http://www.corho.com:8080/#/login/callback
  // vite 中配置： www.corho.com:8080
  // 记得还要修改电脑 hosts 文件
  // 1. 找到 C:\Windows\System32\drivers\etc 下 hosts 文件
  // 2. 在文件中加入  127.0.0.1    www.corho.com
  // 3. 保存即可
  server: {
    // 主机名
    host: 'www.corho.com',
    // 端口
    port: 8080,
    // 其他有价值选项
    // 允许跨域，默认其实就是true
    cors: true,
    // 服务代理
    proxy: {},
    // 启动服务，自动打开浏览器
    open: true,
  },
  plugins: [
    // 需要主动开启响应式语法糖的属性
    vue({
      reactivityTransform: true,
    }),
    vueJsx(),
    vueSetupExtend(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    // https://cn.vitejs.dev/config/#css-preprocessoroptions
    preprocessorOptions: {
      less: {
        additionalData: `
              @import "@/assets/styles/variables.less";
              @import "@/assets/styles/mixins.less";
            `,
      },
    },
  },
});
