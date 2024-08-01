import axios from "axios";

const EXCHANGE_RATE_API = (symbol: string) =>
  "https://api.mobula.io/api/1/market/data?symbol=" + symbol;

export const getPrice = async (symbol: string,apiKey:string) => {
  const res = await axios.get(EXCHANGE_RATE_API(symbol), {
    headers: {
      Authorization: apiKey,
    },
  });
  const data = await res.data;
  return Number(data.data.price);
};
