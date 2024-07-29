import TokenSelector from "./token-selector";
import ChainSelector from "./chain-selector";
import TokenInput from "./token-input";
import Metadata from "./metadata";
import { ChainInfo } from "@/lib/types";

interface TokenBoxProps {
  type: "from" | "to";
  availableChains: ChainInfo[];
}

export default function TokenBox({ type, availableChains }: TokenBoxProps) {
  return (
    <div className="p-3 border border-1 bg-card/80 rounded-md">
      <div className="flex gap-3">
        <ChainSelector chains={availableChains} type={type} />
        <TokenSelector type={type} />
      </div>
      <TokenInput type={type} />
      <Metadata type={type} />
    </div>
  );
}
