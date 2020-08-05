import Stock from "./stock";

export interface VscodeConfig {
  // 数据接口
  api: string,

  // 轮询时间
  interval: number,

  // 收益颜色
  up_color: string,

  // 亏损颜色
  down_color: string,

  // 股票数据
  stocks: Stock[],
}

export default VscodeConfig;
