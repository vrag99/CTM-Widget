import { Asset } from "@chainflip/sdk/swap";
import axios from "axios";

const EXCHANGE_RATE_API = (symbol: Asset) =>
  "https://api.mobula.io/api/1/market/data?symbol=" + symbol;

export const getPrice = async (symbol: Asset) => {
  const res = await axios.get(EXCHANGE_RATE_API(symbol), {
    headers: {
      Authorization: import.meta.env.VITE_MOBULA_API,
    },
  });
  const data = await res.data;
  return Number(data.data.price);
};
