interface FormProps<T> {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
}

interface GenerateProps<T> {
  data: T;
}

const tradingCurrencies = [
  "USDT",
  "USDC",
  "BTC",
  "ETH",
  "BNB",
  "DOGE",
  "SHIB",
  "SOL",
  "ADA",
  "DOT",
  "UNI",
  "LTC",
  "LINK",
  "MATIC",
  "XRP",
  "TRX",
  "TON",
  "FIL",
  "XLM",
  "EOS",
  "AAVE",
  "ATOM",
  "AVAX",
];

export { tradingCurrencies };
export type { FormProps, GenerateProps };
