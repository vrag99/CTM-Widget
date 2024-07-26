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
import { type TokenBoxVariant } from "@/lib/types";

export default function ChainSelector({ type }: TokenBoxVariant) {
  const { setFromChain, setToChain } = useCentralStore();
  const chains = CHAIN_DATA.map((chain) => ({
    name: chain.name,
    icon: chain.icon,
  }));

  return (
    <Select
      onValueChange={(chain) => {
        if (type === "from") {
          setFromChain(chain);
        } else if (type === "to") {
          setToChain(chain);
        }
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select Chain" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Chains</SelectLabel>
          {chains.map((chain) => (
            <SelectItem key={chain.name} value={chain.name}>
              <div className="flex flex-row gap-2 items-center">
                <img src={chain.icon} className="w-5 h-5 rounded-full" />{" "}
                {chain.name}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
