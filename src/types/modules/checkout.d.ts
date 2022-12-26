// 要注意新用户可能没有收货地址，生成类型会不对
// 可以直接使用文档类型即可
export interface UserAddresse {
  id: string;
  receiver: string;
  contact: string;
  provinceCode: string;
  cityCode: string;
  countyCode: string;
  address: string;
  isDefault: number;
  fullLocation: string;
  postalCode: string;
  addressTags: string;
}

export interface Good {
  id: string;
  name: string;
  picture: string;
  count: number;
  skuId: string;
  attrsText: string;
  price: string;
  payPrice: string;
  totalPrice: string;
  totalPayPrice: string;
}

export interface Summary {
  goodsCount: number;
  totalPrice: number;
  totalPayPrice: number;
  postFee: number;
  discountPrice: number;
}

export interface CheckoutInfo {
  userAddresses: UserAddresse[];
  goods: Good[];
  summary: Summary;
}

export interface SubmitCheckout {
  id: string;
  createTime: string;
  payType: number;
  orderState: number;
  payLatestTime: string;
  postFee: number;
  payMoney: number;
  totalMoney: number;
  totalNum: number;
  skus?: any;
  payChannel: number;
  countdown?: any;
}

export interface Property {
  propertyMainName: string;
  propertyValueName: string;
}

export interface Sku {
  id: string;
  spuId: string;
  name: string;
  quantity: number;
  image: string;
  realPay: number;
  curPrice: number;
  totalMoney?: any;
  properties: Property[];
  attrsText: string;
}

export interface OrderDetail {
  id: string;
  createTime: string;
  payType: number;
  orderState: number;
  payLatestTime: string;
  countdown: number;
  postFee: number;
  payMoney: number;
  payChannel: number;
  payState: number;
  totalMoney: number;
  totalNum: number;
  deliveryTimeType: number;
  receiverContact: string;
  receiverMobile: string;
  provinceCode: string;
  cityCode: string;
  countyCode: string;
  receiverAddress: string;
  payTime?: any;
  consignTime?: any;
  endTime?: any;
  closeTime?: any;
  evaluationTime?: any;
  skus: Sku[];
  arrivalEstimatedTime?: any;
}
