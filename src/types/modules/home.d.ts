export interface Children {
  id: string;
  name: string;
  picture: string;
  children?: any;
  goods?: any;
}

export interface Good {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: any;
  orderNum?: any;
}

/*
注意点：
1. 插件生成都是 interface 类型，要和后台返回的数据做好匹配，并且导出
2. 插件生成的 interface，名字都叫 RootObject，需要改更合语义化的名字
 */
export interface Category {
  id: string;
  name: string;
  picture: string;
  children: Children[];
  goods: Good[];
}

export type CategoryList = Category[];

export interface Banner {
  id: string;
  imgUrl: string;
  hrefUrl: string;
  type: string;
}

export type BannerList = Banner[];
