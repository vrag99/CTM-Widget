import { type Chain } from "./types";

import ethereum from "@/assets/chains/ethereum.svg";
import arbitrum from "@/assets/chains/arbitrum.svg";
import bitcoin from "@/assets/chains/bitcoin.svg";
import polkadot from "@/assets/chains/polkadot.svg";

import btc from "@/assets/tokens/btc.svg";
import dot from "@/assets/tokens/dot.svg";
import eth from "@/assets/tokens/eth.svg";
import usdc from "@/assets/tokens/usdc.svg";
import usdt from "@/assets/tokens/usdt.svg";
import flip from "@/assets/tokens/flip.svg";

export const CHAIN_DATA: Chain[] = [
  {
    name: "Ethereum",
    icon: ethereum,
    tokens: [
      { name: "ETH", icon: eth },
      { name: "USDC", icon: usdc },
      { name: "USDT", icon: usdt },
      { name: "FLIP", icon: flip },
    ],
  },
  {
    name: "Bitcoin",
    icon: bitcoin,
    tokens: [
      { name: "BTC", icon: btc },
    ],
  },
  {
    name: "Polkadot",
    icon: polkadot,
    tokens: [
      { name: "DOT", icon: dot },
    ],
  },
  {
    name: "Arbitrum",
    icon: arbitrum,
    tokens: [
      { name: "ETH", icon: eth },
      { name: "USDC", icon: usdc },
      { name: "USDT", icon: usdt },
    ],
  }
];
