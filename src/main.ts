import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import 'normalize.css';

import '@/assets/styles/common.less';
import router from './router';
import XtxUI from './components/XtxUI';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
// 因为是 pinia 的插件，所以在 pinia.use 使用
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(XtxUI);
app.use(router);
app.use(pinia);

app.mount('#app');

/*
使用插件快速生成 ts 的数据类型
1. 安装 json2ts
2. 设置快捷键 建议 3键+v
3. 把要生成的数据复制到剪切板，3键+v 即可生成
*/
