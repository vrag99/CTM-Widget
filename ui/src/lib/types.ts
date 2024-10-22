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

type SDK = "Chainflip" | "Thorchain";

export type Route = {
  metadata: {
    gasPrice: number;
    time: number;
  };
  path: {
    amount: number;
    amountInUSD: number;
    token: string;
    chain: string;
  }[];
  sdk: SDK;
};
