import { Route } from "@/lib/types";

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

import { MoveRight, ChevronsRight } from "lucide-react";

const tokenIcons: { [key: string]: string } = {
  btc: btc,
  dot: dot,
  eth: eth,
  usdc: usdc,
  usdt: usdt,
  flip: flip,
};

const chainIcons: { [key: string]: string } = {
  ethereum: ethereum,
  arbitrum: arbitrum,
  bitcoin: bitcoin,
  polkadot: polkadot,
};

export default function Path({ path }: { path: Route["path"] }) {
  const finalStep = path[path.length - 1];
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-row items-center justify-center gap-1 border-b">
        <div className="relative w-14 h-14">
          <img
            src={tokenIcons[finalStep.token.toLowerCase()]}
            className="w-12 h-12"
          />
          <img
            src={chainIcons[finalStep.chain.toLowerCase()]}
            className="w-6 h-6 border absolute right-0 bottom-1 rounded-full"
          />
        </div>
        <div className="text-left">
          <p className=" font-bold">
            {finalStep.amount.toFixed(2)} {finalStep.token.toUpperCase()}
          </p>
          <p className="text-sm text-muted-foreground">~ ${finalStep.amountInUSD.toFixed(2)}</p>
        </div>
      </div>

    </div>
  );
}
