import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChainflipContext } from "@/context/chainflip";
import { useCentralStore } from "@/hooks/central-store";
import { CHAIN_ICONS } from "@/lib/chain-icon";
import { ChainInfo } from "@/lib/types";
import { WALLETS } from "@/lib/walletProvider";
import { Chain } from "@chainflip/sdk/swap";
import { useContext, useEffect, useState } from "react";
import { useActiveWallet } from "thirdweb/react";

interface ChainSelectorProps {
  chains: ChainInfo[];
  type: "from" | "to";
}
export default function ChainSelector({ chains, type }: ChainSelectorProps) {
  const [mappableChains, setMappableChains] = useState<ChainInfo[]>([]);
  const {sdk} = useContext(ChainflipContext);
  const { fromChain, setFromChain, setToChain ,setWalletConnected,setToAmount,setToAmountUSD,setFromAmount,setFromAmountUSD} = useCentralStore();
  const wallet = useActiveWallet();
  const activeWallet = wallet?.id;
  useEffect(() => {
    if (type === "from") {
      setMappableChains(chains);
    } else {
      sdk.getAvailableChains(fromChain as Chain).then((chains) => {
        const chainsInfo: ChainInfo[] = chains.map((chain) => ({
          id: chain.chain,
          data: chain,
          icon: CHAIN_ICONS.find((chainIcon) => chainIcon.name === chain.name)
            ?.icon,
        }));

        setMappableChains(chainsInfo);
      });
    }
  }, [chains, fromChain]);

  return (
    <Select
      onValueChange={(chain) => {
        setToAmount("--");
        setFromAmount("--");
        setToAmountUSD(0);
        setFromAmountUSD(0);
        if (type === "from") {
          setFromChain(chain);
          const wallet = WALLETS[chain].id;
          if(activeWallet && !wallet.includes(activeWallet)){
            setWalletConnected(false);
          }
        } else if (type === "to") {
          setToChain(chain);
        }
      }}
    >
      <SelectTrigger className="w-[50%]">
        <SelectValue placeholder="Select Chain" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Chains</SelectLabel>
          {mappableChains.map((chain) => (
            <SelectItem key={chain.data.chain} value={chain.data.chain}>
              <div className="flex flex-row gap-2 items-center">
                {chain.icon === undefined ? (
                  ""
                ) : (
                  <img src={chain.icon} className="w-5 h-5 rounded-full" />
                )}{" "}
                {chain.data.chain}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
