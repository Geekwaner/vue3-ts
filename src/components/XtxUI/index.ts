import Skeleton from './Skeleton/Skeleton.vue';
import Slider from './Slider/index.vue';
import More from './More/index.vue';
import Bread from './Bread/index.vue';
import BreadItem from './Bread/Item.vue';
import City from './City/index.vue';
import Count from './Count/index.vue';
import Button from './Button/index.vue';
import CheckBox from './CheckBox/index.vue';
import ImageView from './ImageView/index.vue';
import Sku from './Sku/index.vue';
import Dialog from './Dialog/index.vue';
import InfiniteLoad from './InfiniteLoad/index.vue';
import Tabs from './Tabs/index.vue';
import TabPane from './Tabs/pane.vue';
import type { App, Plugin } from 'vue';
export * from './Message/';

export const XtxSkeleton = Skeleton;
export const XtxSlider = Slider;
export const XtxMore = More;
export const XtxBread = Bread;
export const XtxBreadItem = BreadItem;
export const XtxImageView = ImageView;
export const XtxCity = City;
export const XtxSku = Sku;
export const XtxCount = Count;
export const XtxButton = Button;
export const XtxCheckBox = CheckBox;
export const XtxDialog = Dialog;
export const XtxTabs = Tabs;
export const XtxTabPane = TabPane;
export const XtxInfiniteLoad = InfiniteLoad;

// Plugin, App复制来的类型声明，方便代码输入
// 在main.ts中，调用插件方法，也就是 app.use 时候，其实就是调用了 install
const XtxUI: Plugin = {
  install(app: App) {
    // 配置此应用
    // 全局注册组件
    app.component(`XtxSkeleton`, Skeleton);
    app.component(`XtxSlider`, Slider);
    app.component(`XtxMore`, More);
    app.component(`XtxBread`, Bread);
    app.component(`XtxBreadItem`, BreadItem);
    app.component(`XtxImageView`, ImageView);
    app.component(`XtxCity`, City);
    app.component(`XtxSku`, Sku);
    app.component(`XtxCount`, Count);
    app.component(`XtxButton`, Button);
    app.component(`XtxCheckBox`, CheckBox);
    app.component(`XtxDialog`, Dialog);
    app.component(`XtxTabs`, Tabs);
    app.component(`XtxTabPane`, TabPane);
    app.component(`XtxInfiniteLoad`, InfiniteLoad);
  },
};
export default XtxUI;

// { XtxButton, XtxSkeleton }
