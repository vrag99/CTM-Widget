import { Asset, AssetData, Chain, ChainData } from "@chainflip/sdk/swap";

export type ChainId = string;

export type ChainInfo = {
  id: ChainId;
  data: ChainData;
  icon: string | undefined;
};

export type TokenId = string;

export type Token = {
  icon: string | undefined;
  id: Asset;
  data: AssetData;
};

export type TokenBoxVariant = {
  type: "from" | "to";
};

export type Route = {
  metadata: {
    gasPrice: string;
    time: number; // TODO: Change to Date
  };
  path: {
    amount: string;
    amountInUSD: string;
    token: string;
    chain: string;
  }[];
};
