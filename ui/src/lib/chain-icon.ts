
import ethereum from "@/assets/chains/ethereum.svg";
import arbitrum from "@/assets/chains/arbitrum.svg";
import bitcoin from "@/assets/chains/bitcoin.svg";
import polkadot from "@/assets/chains/polkadot.svg";


import { Chains } from "@chainflip/sdk/swap";

export const CHAIN_ICONS = [
  {
    name: Chains.Ethereum,
    icon: ethereum,
  },
  {
    name:Chains.Bitcoin,
    icon: bitcoin,
  },
  {
    name: Chains.Polkadot,
    icon: polkadot,
  },
  {
    name: Chains.Arbitrum,
    icon: arbitrum,
  }
];
