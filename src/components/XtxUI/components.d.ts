/*
  1. XtxUI 文件夹 新建 components.d.ts 声明文件
  2. volar 复制 声明文件的架子
  3. 把需要声明的全局组件，填上去, typeof 组件可以返回组件类型
  declare   声明
  module    模块
  GlobalComponents  全局的组件
*/

import {
  XtxSkeleton,
  XtxSlider,
  XtxMore,
  XtxBread,
  XtxBreadItem,
  XtxImageView,
  XtxCity,
  XtxSku,
  XtxCount,
  XtxButton,
  XtxCheckBox,
  XtxDialog,
  XtxTabs,
  XtxTabPane,
  XtxInfiniteLoad,
} from '.';

declare module '@vue/runtime-core' {
  // Vue 3
  // declare module 'vue' {   // Vue 2.7
  // declare module '@vue/runtime-dom' {  // Vue <= 2.6.14
  export interface GlobalComponents {
    XtxSkeleton: typeof XtxSkeleton;
    XtxSlider: typeof XtxSlider;
    XtxMore: typeof XtxMore;
    XtxBread: typeof XtxBread;
    XtxBreadItem: typeof XtxBreadItem;
    XtxImageView: typeof XtxImageView;
    XtxCity: typeof XtxCity;
    XtxSku: typeof XtxSku;
    XtxCount: typeof XtxCount;
    XtxButton: typeof XtxButton;
    XtxCheckBox: typeof XtxCheckBox;
    XtxDialog: typeof XtxDialog;
    XtxTabs: typeof XtxTabs;
    XtxTabPane: typeof XtxTabPane;
    XtxInfiniteLoad: typeof XtxInfiniteLoad;
  }
}

export {};
