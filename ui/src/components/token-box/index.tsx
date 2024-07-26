import TokenSelector from "./token-selector";
import ChainSelector from "./chain-selector";
import TokenInput from "./token-input";
import Metadata from "./metadata";
import { type TokenBoxVariant } from "@/lib/types";

export default function TokenBox({ type }: TokenBoxVariant) {
  return (
    <div className="p-3 border border-1 rounded-md">
      <div className="flex gap-3">
        <ChainSelector type={type} />
        <TokenSelector type={type} />
      </div>
      <TokenInput />
      <Metadata />
    </div>
  );
}
