import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCentralStore } from "@/hooks/central-store";
import { CHAIN_DATA } from "@/lib/chain-data";
import { type Token } from "@/lib/types";
import { type TokenBoxVariant } from "@/lib/types";

export default function TokenSelector({ type }: TokenBoxVariant) {
  const { fromChain, toChain, setFromToken, setToToken } = useCentralStore();
  const tokens: Token[] =
    CHAIN_DATA.find(
      (chain) => chain.name === (type === "from" ? fromChain : toChain)
    )?.tokens || [];

  return (
    <Select
      onValueChange={(token) => {
        if (type === "from") {
          setFromToken(token);
        } else if (type === "to") {
          setToToken(token);
        }
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select Token" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tokens</SelectLabel>
          {tokens.map((token) => (
            <SelectItem
              key={token.name}
              value={token.name}
              onClick={() => setFromToken(token.name)}
            >
              <div className="flex flex-row gap-2 items-center">
                <img src={token.icon} className="w-5 h-5 rounded-full" />{" "}
                {token.name}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
