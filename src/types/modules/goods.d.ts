export interface Brand {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  picture: string;
  type?: any;
  desc?: any;
  place?: any;
}

export interface Value {
  name: string;
  picture: string;
  desc: string;
}

export interface Spec {
  name: string;
  id: string;
  values: Value[];
}

export interface Spec {
  name: string;
  valueName: string;
}

export interface Sku {
  id: string;
  skuCode: string;
  price: string;
  oldPrice: string;
  inventory: number;
  specs: Spec[];
}

export interface Parent {
  id: string;
  name: string;
  layer: number;
  parent?: any;
}

export interface Category {
  id: string;
  name: string;
  layer: number;
  parent: Parent;
}

export interface Property {
  name: string;
  value: string;
}

export interface Detail {
  pictures: string[];
  properties: Property[];
}

export interface SimilarProduct {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: any;
  orderNum: number;
}

export interface HotByDay {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: any;
  orderNum: number;
}

/*
1. 插件生成的接口类型名字都叫 RootObject，要改名
2. 和后台返回的数据做好匹配，并且导出
*/
export interface GoodsDetail {
  id: string;
  name: string;
  spuCode: string;
  desc: string;
  price: string;
  oldPrice: string;
  discount: number;
  inventory: number;
  brand: Brand;
  salesCount: number;
  commentCount: number;
  collectCount: number;
  mainVideos: any[];
  videoScale: number;
  mainPictures: string[];
  specs: Spec[];
  skus: Sku[];
  categories: Category[];
  details: Detail;
  isPreSale: boolean;
  isCollect?: any;
  recommends?: any;
  userAddresses?: any;
  similarProducts: SimilarProduct[];
  hotByDay: HotByDay[];
  evaluationInfo?: any;
}
