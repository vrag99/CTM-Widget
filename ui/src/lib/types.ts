import { AssetData, Chain, ChainData } from "@chainflip/sdk/swap";

export type ChainId = string;

export type ChainInfo = {
  id:ChainId
  data:ChainData ,
  icon: string | undefined;
};
export type TokenId = string;


export type Token = {
  icon: string | undefined;
  id:TokenId;
  data:AssetData  ;
};

export type TokenBoxVariant = {
  type: "from" | "to";
};
