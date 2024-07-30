import btc from "@/assets/tokens/btc.svg";
import dot from "@/assets/tokens/dot.svg";
import eth from "@/assets/tokens/eth.svg";
import usdc from "@/assets/tokens/usdc.svg";
import usdt from "@/assets/tokens/usdt.svg";
import flip from "@/assets/tokens/flip.svg";
import { Assets } from "@chainflip/sdk/swap";

export const TOKEN_ICONS = [
  {
    name: Assets.BTC,
    icon: btc,
  },
  {
    name: Assets.ETH,
    icon: eth,
  },
  {
    name: Assets.USDC,
    icon: usdc,
  },
  {
    name: Assets.USDT,
    icon: usdt,
  },
  {
    name: Assets.FLIP,
    icon: flip,
  },
  {
    name: Assets.DOT,
    icon: dot,
  },
];
