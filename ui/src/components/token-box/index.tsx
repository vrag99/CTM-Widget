import TokenSelector from "./token-selector";
import ChainSelector from "./chain-selector";
import TokenInput from "./token-input";
import Metadata from "./metadata";

export default function TokenBox() {
  return (
    <>
      <div>Token box</div>
      <TokenSelector />
      <ChainSelector />
      <TokenInput />
      <Metadata />
    </>
  );
}
