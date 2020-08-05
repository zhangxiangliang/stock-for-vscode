export interface Stock {
  // 名称
  name: string;

  // 代码
  code: string;

  // 盈亏价格
  price: number;

  // 盈亏百分比
  percent: number;

  // 持有均价
  unit: number;

  // 持有数量
  volume: number,
}

export default Stock;
