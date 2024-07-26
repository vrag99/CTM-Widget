import TokenSelector from "./token-selector";
import ChainSelector from "./chain-selector";
import TokenInput from "./token-input";
import Metadata from "./metadata";

export default function TokenBox() {
  return (
    <div className="p-3 border border-1 rounded-md">
      <div className="flex gap-3">
        <ChainSelector />
        <TokenSelector />
      </div>
      <TokenInput />
      <Metadata />
    </div>
  );
}
