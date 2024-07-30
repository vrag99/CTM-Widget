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
  return (
    <div className="flex flex-row overflow-auto items-center justify-center w-full">
      {path.map((step, index) => {
        if (index === path.length - 1) {
          return (
            <div className="flex flex-row items-center justify-center gap-1">
              <div className="relative w-14 h-14">
                <img
                  src={tokenIcons[step.token.toLowerCase()]}
                  className="w-12 h-12"
                />
                <img
                  src={chainIcons[step.chain.toLowerCase()]}
                  className="w-6 h-6 border absolute right-0 bottom-1 rounded-full"
                />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold">
                  {step.amount} {step.token.toUpperCase()}
                </p>
                <p className="text-xs text-muted-foreground">
                  ${step.amountInUSD}
                </p>
              </div>
            </div>
          );
        } else {
          return (
            <>
              <div className="flex flex-row items-center justify-center gap-2">
                <div className="relative w-10 h-10">
                  <img
                    src={tokenIcons[step.token.toLowerCase()]}
                    className="w-8 h-8"
                  />
                  <img
                    src={chainIcons[step.chain.toLowerCase()]}
                    className="w-5 h-5 border absolute right-0 bottom-1 rounded-full"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-accent-foreground">
                    {step.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {step.token.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="w-32 h-[1px] border-dotted border-white bg-transparent px-2"></div>
            </>
          );
        }
      })}
    </div>
  );
}
