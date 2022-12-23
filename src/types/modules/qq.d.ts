// 生成是Data，重名概率太大，决定改名QQData，下面也要一起改名
export interface QQData {
  ret: number;
  msg: string;
  is_lost: number;
  nickname: string;
  gender: string;
  gender_type: number;
  province: string;
  city: string;
  year: string;
  constellation: string;
  figureurl: string;
  figureurl_1: string;
  figureurl_2: string;
  figureurl_qq_1: string;
  figureurl_qq_2: string;
  figureurl_qq: string;
  figureurl_type: string;
  is_yellow_vip: string;
  vip: string;
  yellow_vip_level: string;
  level: string;
  is_yellow_year_vip: string;
}

export interface QQUserInfo {
  status: string;
  fmt: string;
  ret: number;
  code: number;
  data: QQData; // 注意我这里也要改名叫QQData
  seq: string;
  dataText: string;
}
